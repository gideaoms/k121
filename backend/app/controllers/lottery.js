const User = require('../models/user');
const mailer = require('../modules/mailer');

const getFriends = async () => {
  const friends = await User.find({ friend: { $ne: null } });
  return friends.map(({ friend }) => friend);
};

const getChosenFriend = async (actualUserId, friends) =>
  User.aggregate([
    { $match: { _id: { $nin: [actualUserId, ...friends] } } },
    { $sample: { size: 1 } },
  ]);

const whenThereIsOnlyOneUserLeft = async (userId) => {
  const friend = await User.aggregate([
    { $match: { _id: { $ne: userId } } },
    { $sample: { size: 1 } },
  ]);
  await User.findByIdAndUpdate(friend[0]._id, { $set: { friend: userId } });
  await User.findByIdAndUpdate(userId, { $set: { friend: friend[0].friend } });
};

const sendMail = (users = []) => {
  users.map(user =>
    mailer({
      from: 'no-replay@amigosecreto.com.br',
      to: `${user.name} <${user.email}>`,
      subject: 'Sorteio do amigo secreto',
      template: 'lottery',
      context: {
        name: user.name,
        friend: user.friend.name,
      },
    }));
};

module.exports = {
  async run(request, response, next) {
    try {
      await User.update({}, { $unset: { friend: 1 } }, { multi: true });
      const users = await User.find();

      if (users.length === 0) {
        return response.status(400).json({ error: 'Você não cadastrou nenhum usuário ainda' });
      }

      await users.reduce(async (before, user) => {
        await before;
        const friends = await getFriends();
        const friend = await getChosenFriend(user._id, friends);
        if (friend[0]) {
          await User.findByIdAndUpdate(user._id, { $set: { friend: friend[0]._id } });
        } else {
          await whenThereIsOnlyOneUserLeft(user._id);
        }
      }, Promise.resolve());

      const usersWithYoursFriends = await User.find().populate({ path: 'friend', select: 'name' });

      sendMail(usersWithYoursFriends);

      return response.json(usersWithYoursFriends);
    } catch (err) {
      return next(err);
    }
  },
};

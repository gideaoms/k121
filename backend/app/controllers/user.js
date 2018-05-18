const User = require('../models/user');

const isUniqueEmail = (email, id) => {
  if (id) {
    return User.findOne({ $and: [{ email: { $eq: email } }, { _id: { $ne: id } }] });
  }
  return User.findOne({ email });
};

module.exports = {
  async index(request, response, next) {
    try {
      const users = await User.find();

      return response.json(users);
    } catch (err) {
      return next(err);
    }
  },
  async show(request, response, next) {
    try {
      const user = await User.findById(request.params.id);

      return response.json(user);
    } catch (err) {
      return next(err);
    }
  },
  async create(request, response, next) {
    try {
      const { name, email } = request.body;

      if (await isUniqueEmail(email)) {
        return response.status(400).send({ error: `O e-mail ${email} já está em uso` });
      }

      const user = await User.create({ name, email });

      return response.json(user);
    } catch (err) {
      return next(err);
    }
  },
  async update(request, response, next) {
    try {
      const { name, email } = request.body;

      if (await isUniqueEmail(email, request.params.id)) {
        return response.status(400).send({ error: `O e-mail ${email} já está em uso` });
      }

      const user = await User.findOneAndUpdate({ _id: request.params.id }, { name, email });

      return response.json(user);
    } catch (err) {
      return next(err);
    }
  },
  async destroy(request, response, next) {
    try {
      await User.findByIdAndRemove(request.params.id);
      return response.end();
    } catch (err) {
      return next(err);
    }
  },
};

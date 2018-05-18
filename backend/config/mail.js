const path = require('path');

module.exports = {
  host: process.env.MAIL_HOST || 'smtp.ethereal.email',
  port: process.env.MAIL_PORT || 587,
  user: process.env.MAIL_USER || 'sphoyj3waozkgkvh@ethereal.email',
  pass: process.env.MAIL_PASS || 'hCVvJ4a9nqavfMPEek',
  templatePath: path.resolve('app', 'resources', 'mail'),
};

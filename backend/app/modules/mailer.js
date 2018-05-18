const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const htmlToText = require('html-to-text');
const {
  host,
  port,
  user,
  pass,
  templatePath,
} = require('../../config/mail');

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

module.exports = ({ template, context, ...options }) => {
  const file = fs.readFileSync(path.join(templatePath, `${template}.hbs`), 'utf8');
  const hbsTemplate = hbs.compile(file)(context);
  return transport.sendMail({
    ...options,
    html: hbsTemplate,
    text: htmlToText.fromString(hbsTemplate).trim(),
  });
};

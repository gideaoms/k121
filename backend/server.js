const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { url } = require('./config/database');
const { port } = require('./config/app');
const routes = require('./app/routes');

app.use(bodyParser.json());

const start = async () => {
  await mongoose.connect(url);

  app.use('/api', routes);

  app.listen(port, () => global.console.log('Running'));
};

start();

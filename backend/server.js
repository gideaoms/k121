const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { url } = require('./config/database');
const { port } = require('./config/app');
const routes = require('./app/routes');

const start = async () => {
  await mongoose.connect(url);

  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api', routes);

  app.listen(port, () => global.console.log('Running'));
};

start();

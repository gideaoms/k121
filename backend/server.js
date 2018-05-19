const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { url } = require('./config/database');
const { port, origin } = require('./config/app');
const routes = require('./app/routes');

const app = express();

const start = async () => {
  await mongoose.connect(url);

  app.use(express.static(path.resolve('../', 'frontend', 'public')));
  app.use(cors({ origin }));
  app.use(bodyParser.json());

  app.use('/api', routes);

  app.listen(port, () => global.console.log('Running'));
};

start();

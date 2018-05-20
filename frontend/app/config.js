import app from './app';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    URL_API: 'http://localhost:3000/api',
  },
  production: {
    URL_API: 'https://gideao-k121.herokuapp.com',
  },
};

app.constant('config', config[env]);

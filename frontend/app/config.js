import app from './app';

const env = process.env.NODE_ENV || 'development';

const config = {
  production: {
    HOST_URL: 'https://gideao-k121.herokuapp.com/api',
  },
  development: {
    HOST_URL: 'http://localhost:3000/api',
  },
};

app.constant('config', config[env]);

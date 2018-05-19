import app from './app';

app.constant('config', {
  URL_API: process.env.HOST || '/api',
});

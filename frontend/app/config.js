import app from './app';

app.constant('config', {
  URL_API: process.env.HOST || 'http://localhost:3000/api',
});

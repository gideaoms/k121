import app from './app';

console.log(process.env);

app.constant('config', {
  URL_API: process.env.HOST_URL || 'http://localhost:3000/api',
});

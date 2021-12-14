const session = require('express-session');
const MongoStore = require('connect-mongo');

const config = require('./config')

let sessionStore = MongoStore.create({
  mongoUrl: config.mongoose.url,
  autoRemove: "native",
});
const configSession = app => {
  app.use(
    session({
      secret: "etasycandy",
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 86400 seconds = 1 day
      },
    })
  );
};

module.exports = {
    configSession
}
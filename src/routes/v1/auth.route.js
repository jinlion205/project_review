const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const User = require('../../models/user.model');
const { requiredLogin, requiredLogout } = require('../../middlewares/auth');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const multer = require('multer');
const upload = multer({ dest: '/public/img/uploads/' });

const router = express.Router();

// init passport local

const initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.isPasswordMatch(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

initPassportLocal();

router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), function (req, res) {
  res.redirect('/auth/');
});
router.post('/register', authController.register);

router.get('/login', requiredLogout, (req, res) => {
  res.render('login', { success: '', error: '', type: '' });
});

router.get('/logout', requiredLogin, authController.logout);

router.get('/', requiredLogin, (req, res, next) => {
  console.log({ id: req.user });
  res.send('Hello');
});

module.exports = router;

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { validate } = require('../middlewares/validate')
const authValidation = require('../validations/auth.validation');
const createError = require('http-errors')
const { authService, userService, tokenService, emailService } = require('../services');

const register = async (req, res) => {
  try {
    const value = await validate(authValidation.register, req.body);
    await userService.createUser(value);
    res.render('login', { success: 'Thành công!', error: '', type: 'register'});
  } catch (error) {
    console.log({error})
    let errors = '';
    if (Array.isArray(error)) {
      errors = error[0].message;
    }
    error.message
    res.render('login', { success: '', error: errors || error.message, type: 'register'})
  }
};

// const login = async (req, res) => {
//   try {
//     const body = await validate(authValidation.login, req.body);
//     const user = await userService.getUserByEmail(body.email)

//     if (!user) {
//       throw createError.NotFound('Incorrect email');
//     }   

//     if (!user.isPasswordMatch(body.password)) {
//       throw createError.NotFound('Incorrect password');
//     }

//     res.render('login', { success: 'Thành công!', error: '', type: 'login'});
//   } catch (error) {
//     console.log({error})
//     let errors = '';
//     if (Array.isArray(error)) {
//       errors = error[0].message;
//     }
//     error.message
//     res.render('login', { success: '', error: errors || error.message, type: 'login'})
//   }
// };

const logout = catchAsync(async (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};

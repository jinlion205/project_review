const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const Company = require('../../models/company.model');
const User = require('../../models/user.model');

const router = express.Router();

router.get('/error-update', (req, res) => {
  res.render('error-update');
});

router.get('/', (req, res) => {
  res.render('admin');
});

/**
 * POST add company
 */
router.post('/comp-list', async (req, res) => {
  await Company.create(req.body);
  res.redirect('/admin/comp-list');
});

/**
 * GET company
 */
router.get('/comp-list', async (req, res) => {
  const company = await Company.find();
  res.render('comp-list', { company });
});

/**
 * Update company
 */
router.get('/update-comp/:id', async (req, res) => {
  const company = await Company.findById(req.params.id);
  res.render('update-comp', { company });
});

router.post('/update-comp/:id', async (req, res) => {
  await Company.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/comp-list');
});

/**
 * DELETE company
 */
router.post('/delete', async (req, res) => {
  await Company.findByIdAndDelete(req.body.id);
  res.redirect('/admin/comp-list');
});

/**
 * POST add user
 */
router.post('/user-management', async (req, res) => {
  await User.create(req.body);
  res.redirect('/admin/user-management');
});

/**
 * GET User
 */
router.get('/user-management', async (req, res) => {
  const user = await User.find();
  res.render('user-management', { user });
});

/**
 * Update user
 */
router.get('/update-user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('update-user', { user });
});

router.post('/update-user/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/user-management');
});

/**
 * DELETE User
 */
router.post('/deleteUser', async (req, res) => {
  await User.findByIdAndDelete(req.body.id);
  res.redirect('/admin/user-management');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

module.exports = router;

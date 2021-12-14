const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').post(userController.createUser).get(userController.getUsers);

router.route('/:userId').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;

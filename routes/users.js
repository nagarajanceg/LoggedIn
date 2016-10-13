var express = require('express');
var router = express.Router();
var userController = require('../app/controllers/userController')();

/* Add new Users */
router.route('/add')
.get(userController.addUser);

/* List all users */
router.route('/get')
.get(userController.getUsers);

/* Delete users */
router.route('/delete')
.get(userController.deleteUser)


/* Update the existing users */
router.route('/update')
.get(userController.updateUser);

/* Login validation check */
router.route('/login')
.get(userController.validateLogin)

module.exports = router;

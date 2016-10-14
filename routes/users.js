var express = require('express');
var router = express.Router();
var userController = require('../app/controllers/userController')();

/* Add new Users */
router.route('/add')
.post(userController.addUser);

/* List all users */
router.route('/get')
.get(userController.getUsers);

/* Delete users */
router.route('/delete')
.delete(userController.deleteUser)


/* Update the existing users */
router.route('/update')
.post(userController.updateUser);

/* Login validation check */
router.route('/login')
.get(userController.validateLogin)

module.exports = router;

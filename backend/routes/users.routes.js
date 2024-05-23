const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { isAdmin } = require('../middleware/auth');

const isAuth=require("../middleware/auth").isAuth

const isadmin=require("../middleware/auth").isAdmin
// Administrator routes
router.post('/create',isAdmin, userController.createUser); // Only administrators can create users
router.delete('/api/user/delete/:id',isAdmin, userController.deleteUser); // Only administrators can delete users



// Get all users (accessible to administrators only)
router.get('/api/allusers',isAdmin, userController.getAllUsers);

// Get a specific user by ID (accessible to administrators only)
router.get('/:id',isAdmin, userController.getUserById);

// Update a user by ID (accessible to administrators only)
router.put('/:id',isAdmin, userController.updateUser);

module.exports = router;

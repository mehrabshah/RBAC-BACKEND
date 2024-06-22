const express = require('express');
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware')

const router = express.Router();
router.get('/createProfile',authMiddleware, roleMiddleware(['admin']),adminController.createAdminProfile);

module.exports = router;



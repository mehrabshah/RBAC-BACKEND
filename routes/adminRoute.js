const express = require('express');
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/createProfile',authMiddleware,adminController.createAdminProfile);


module.exports = router;



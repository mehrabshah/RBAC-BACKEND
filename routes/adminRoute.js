const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/createProfile', adminController.createAdminProfile);


module.exports = router;



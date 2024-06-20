const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.post('/createProfile', doctorController.createDoctorProfile);


module.exports = router;



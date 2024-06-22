const express = require('express');
const doctorController = require('../controllers/doctorController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware')

const router = express.Router();

router.get('/createProfile',authMiddleware, roleMiddleware(['doctor']), doctorController.createDoctorProfile);


module.exports = router;



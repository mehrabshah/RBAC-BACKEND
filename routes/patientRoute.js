const express = require('express');
const patientController = require('../controllers/patientController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware')

const router = express.Router();

router.get('/createProfile',authMiddleware, roleMiddleware(['patient']), patientController.createPatientProfile );

module.exports = router;



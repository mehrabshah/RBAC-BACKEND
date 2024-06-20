const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.post('/createProfile', patientController.createPatientProfile );

module.exports = router;



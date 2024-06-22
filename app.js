require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; 
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const adminRoutes = require('./routes/adminRoute')
const doctorRoutes = require('./routes/doctorRoute')
const patientRoutes = require('./routes/patientRoute')

connectDB();

app.use(cors());

app.use(express.json());  
app.use(express.urlencoded());  
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
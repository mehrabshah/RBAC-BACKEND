require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');


connectDB();
app.use(express.json());  
app.use(express.urlencoded());  

app.use('/api/auth', authRoutes);



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./Config/db');



const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test route    
app.get('/', (req, res) => {
    console.log('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
/* eslint-disable no-undef */

// require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
// route files
dotenv.config({ path: './config/.env' });
connectDB();



const bootcamps = require('./routes/bootcamps');
const app = express();
// dev logging middleware
// body parser
app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/bootcamps', bootcamps);


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold);
});
process.on('unhandledRejection', (err, promise) => {
    console.log(`error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
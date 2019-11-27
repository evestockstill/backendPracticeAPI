/* eslint-disable no-undef */
const express = require('express');
const dontenv = require('dotenv');

dontenv.config({ path: './config/config.env' });

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.listen(PORT, 
    // eslint-disable-next-line no-undef
    console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`));


// require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async() => {
    // eslint-disable-next-line no-undef
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
};
module.exports = connectDB;
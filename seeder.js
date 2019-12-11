/* eslint-disable no-undef */
const fs = require('fs');
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const dotenv = require('dotenv');

// load env vars
dotenv.config({ path: './config/.env' });

// load models
const Bootcamp = require('./models/Bootcamp');
// connect to DB 
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
// read JSON
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
// import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data Imported ...'.green.inverse);
    process.exit();
  } catch(err) {
    console.error(err);
  }
}
// delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Data Destroyed ...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}
// i = import d = delete
if(process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}


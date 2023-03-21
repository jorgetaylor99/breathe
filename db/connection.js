require('dotenv').config();
const mongoose = require('mongoose');

// destructure env variables
const {DATABASE_URL} = process.env;

mongoose.connect = mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
    .on('open', () => console.log('Connected to MongoDB'))
    .on('close', () => console.log('Disconnected from MongoDB'))
    .on('error', (error) => console.log(error));

// export connection
module.exports = mongoose;
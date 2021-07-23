const mongoose = require('mongoose');
const dbName = require('../../config/database.config');

const connectDb = async () => {
  try {
    await mongoose.connect(dbName.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (e) {
    console.log('Failed to connect to MongoDB,', e);
  }
};

module.exports = connectDb;

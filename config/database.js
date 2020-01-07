const mongoose = require('mongoose');
const config = require('config');
const database = config.get('mongoURI');

const connectDataBase = async () => {
  try {
    const connection = await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Successfully Connected to.....${connection.connection.host}`.blue.bold);
  } catch (error) {
    console.error();
    process.exit(1);
  }
};
module.exports = connectDataBase;

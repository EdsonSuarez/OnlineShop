const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB: ON");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    throw new Error("Error connecting to MongoDB");
  }
};

module.exports = { dbConnection };

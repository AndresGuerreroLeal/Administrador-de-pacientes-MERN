const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Conectada");
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
};

module.exports = db;

require('dotenv').config()
const mongoose = require("mongoose");

const MONGOOSE_URL = process.env['MONGOLAB_URI'] || "mongodb://127.0.0.1:27017/polls"
// Set database connection
mongoose
  .connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

const connection = mongoose.connection;

connection.once("open", () => {
  console.info("DB is connected successfully");
});
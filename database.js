const mongoose = require("mongoose");

// Set database connection
mongoose
  .connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017/polls", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));
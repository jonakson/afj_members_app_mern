const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use("/api/v1/members", require("./routes/memberRoutes"));

app.listen(port, () => {
  console.log(`Server started on por ${port}`);
});

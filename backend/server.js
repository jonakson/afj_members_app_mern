const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Body parser for RAW JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes for the different endpoints.
app.use("/api/v1/members", require("./routes/memberRoutes"));
app.use("/api/v1/memberships", require("./routes/membershipRoutes"));
app.use("/api/v1/activities", require("./routes/activityRoutes"));
app.use("/api/v1/payments", require("./routes/paymentRoutes"));
app.use("/api/v1/enrolments", require("./routes/enrolmentRoutes"));

// Express error handler.
app.use(errorHandler);

// Express listening port.
app.listen(port, () => {
  console.log(`Server started on por ${port}`);
});

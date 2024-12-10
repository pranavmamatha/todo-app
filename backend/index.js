require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db");
const app = express();
const todosRoute = require("./routes/todos");
app.use(express.json());

connectDB();

app.use("/todos", todosRoute);

app.listen(process.env.PORT, () => {
  console.log("server running in port", process.env.PORT);
});
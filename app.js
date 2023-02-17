require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const dataRoute = require("./router/data");
const predicteRoute = require("./router/calculate");
const mongoose = require("mongoose");
//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    process.env.DB_URL,

    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Data base is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTION,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Hi,the API is working.");
});

app.use("/api/v1", dataRoute);
app.use("/api/v1", predicteRoute);

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server is running successfully on port : ${port}`);
});

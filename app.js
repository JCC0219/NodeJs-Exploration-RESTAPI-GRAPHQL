const path = require("path");
const express = require("express");
const bodyParser = require("body-parser"); //req.body
const mongoose = require("mongoose");

//routes
const feedRoutes = require("./routes/feed");

//middleware application
const app = express();

// app.use(bodyParser.urlencoded()); //x-www-firn-urlencoded <form>

app.use(bodyParser.json()); //application/json
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb+srv://jingcheng060:dQgoIkwLxLRCQmyr@cluster0.v1voybz.mongodb.net/messages?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connected to DB!");
    app.listen(8080);
  })
  .catch((err) => console.log(err));

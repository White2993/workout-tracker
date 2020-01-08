const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require('mongojs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const User = require("./models/workout.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = 'workoutTracker';
const collections = ['workout'];

const db = mongojs(databaseUrl, collections);

db.on('error', error => {
  console.log('Database Error:', error);
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"))
})

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"))
});

app.get("/api/workouts", (req, res) => {
  console.log(req.body);

  db.workout.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

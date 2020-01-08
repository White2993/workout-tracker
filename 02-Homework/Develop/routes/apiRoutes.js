module.exports = function (app) {
  const Workout = require("../models/workout");
  app.get("/api/workouts", (req, res) => {
    Workout.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.json(err);
      });
  });
  app.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
      .then(db => {
        res.json(db);
      })
      .catch(err => {
        res.json(err);
      });
  });
  app.post("/api/workouts", (req, res) => {
    console.log("Req", body);
    Workout.create(body)
      .then(db => {
        res.json(db);
      })
      .catch(err => {
        res.json(err);
      });
  });
  app.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.json(err);
      });
  });
}
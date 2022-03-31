const express = require("express");
const router = express.Router();
const fs = require("fs");
//const { v4: uuidv4 } = require("uuid");

// get collection of vehicles
router.get("/", (req, res) => {
    fs.readFile("./data/vehicles.json", "utf-8", (err, data) => {
      const vehiclesData = JSON.parse(data);
      if (err) {
        res.status(400).send("Error reading file");
      } else {
        res.json(vehiclesData);
      }
    });
  });
  
  // Returns data for a specific vehicle by a given ID
  router.get("/:id", (req, res) => {
    fs.readFile("./data/vehicles.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(501).send("Error reading data file.");
      } else {
        const vehiclesData = JSON.parse(data);
        const reqVehicle = vehiclesData.find((vehicle) => {
          return vehicle.id === req.params.id;
        });
        // console.log();
        if (reqVehicle) {
          res.status(201).json(reqVehicle);
        } else {
          res.status(404).json({
            message: "No vehicle with that id exists",
          });
        }
      }
    });
  });

  module.exports = router

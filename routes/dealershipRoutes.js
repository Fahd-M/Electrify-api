const express = require("express");
const router = express.Router();
const fs = require("fs");

  // Returns data for a specific dealership by a given dealerID
  router.get("/:id", (req, res) => {
    fs.readFile("./data/dealerships.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(501).send("Error reading data file.");
      } else {
        const dealershipsData = JSON.parse(data);
        const reqVehicle = dealershipsData.find((dealership) => {
          return dealership.id === req.params.id;
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
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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


    // Returns data for a specific vehicle by a given ID
// Read the json data, filter out the id that matches the id of the requested warehouse that the user wishes to delete. 
// then write the new file with the updated data, making sure to filter any inventory
// items with that particular deleted warehouse's id and write those changes back into data
router.delete("/:id", (req,res)=>{
    fs.readFile('./data/vehicles.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.status(400).send(`Internal server Error`)
      } else {
        const vehiclesData = JSON.parse(data);
        const updatedVehiclesData = vehiclesData.filter((vehicle) => {
          return vehicle.id !== req.params.id});
        fs.writeFile(
          "./data/vehicles.json",
          JSON.stringify(updatedVehiclesData), 
          () => {
            res.json(updatedVehiclesData)
          }
        );
      }
    });
  });


  
router.post("/", (req, res) => {
  const newVehicle = {
    id: uuidv4(),
    // dealerId:req.body.dealership.make, 
    make: req.body.make,
    model: req.body.model,
    trim: req.body.trim,
    basePrice: req.body.basePrice,
    powertrain:req.body.powertrain,

    engine: {
      engineSpec1: req.body.engineSpec1,
      engineSpec2: req.body.engineSpec2,
      engineSpec3: req.body.engineSpec3,
    },

      
    drivetrain: req.body.drivetrain,
    horsepower: req.body.horsepower,
    battery: {
      type: req.body.batteryType,
      capacity: req.body.batteryCapacity,
    },

    chargeTime: {
      mechanism: req.body.chargeTimeMech,
      level1: req.body.chargeTimeL1,
      level2: req.body.chargeTimeL2,
      level3: req.body.chargeTimeL3,
    },

    range: req.body.range,
    efficiency:req.body.efficiency,

    airbags: req.body.airbags,
    seats: req.body.seats,
    trim: req.body.trim,
    basePrice: req.body.basePrice,
    efficiency:req.body.powertrain,

    electricWarranty: {
      components: req.body.electricWarrantyComponents,
      battery: req.body.electricWarrantyBattery,
    },

    // contact: {
    //   name: req.body.name,
    //   address: req.body.address,
    //   phone: req.body.phone,
    //   email: req.body.email,
    // },
  };
  fs.readFile("./data/vehicles.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Internal server error");
    } else {
      const vehiclesData = JSON.parse(data);
      vehiclesData.unshift(newVehicle);
      fs.writeFile(
        "./data/vehicles.json",
        JSON.stringify(vehiclesData),
        () => {
          res.send("Vehicle has been added");
        }
      );
    }
  });
});

  module.exports = router

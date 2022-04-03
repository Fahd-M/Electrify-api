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


router.put("/:id", (req, res) => {
  fs.readFile("./data/vehicles.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Internal Server Error");
    } else {
      const vData = JSON.parse(data);
      const id = vData.findIndex((vehicle) => {
        return vehicle.id === req.params.id;
      });
      if (id >= 0) {
        vData[id]["make"] = req.body.make;
        vData[id]["model"] = req.body.model;
        vData[id]["trim"] = req.body.trim;
        vData[id]["basePrice"] = req.body.basePrice;

        vData[id]["powertrain"] = req.body.powertrain;
        vData[id]["engine"]["engineSpec1"] = req.body.engineSpec1;
        vData[id]["engine"]["engineSpec2"] = req.body.engineSpec2;
        vData[id]["engine"]["engineSpec3"] = req.body.engineSpec3;

        vData[id]["drivetrain"] = req.body.drivetrain;
        vData[id]["horsepower"] = req.body.horsepower;
        vData[id]["battery"]["type"] = req.body.batteryType;
        vData[id]["battery"]["capacity"] = req.body.batteryCapacity;
        vData[id]["chargeTime"]["mechanism"] = req.body.chargeTimeMech;
        vData[id]["chargeTime"]["level1"] = req.body.chargeTimeL1;
        vData[id]["chargeTime"]["level2"] = req.body.chargeTimeL2;
        vData[id]["chargeTime"]["level3"] = req.body.chargeTimeL3;

        vData[id]["range"] = req.body.range;
        vData[id]["efficiency"] = req.body.efficiency;
        vData[id]["airbags"] = req.body.airbags;

        vData[id]["seats"] = req.body.seats;
        vData[id]["electricWarranty"]["components"] = req.body.electricWarrantyComponents;
        vData[id]["electricWarranty"]["battery"] = req.body.electricWarrantyBattery;
        fs.writeFile(
          "./data/vehicles.json",
          JSON.stringify(vData),
          () => {
            res.send("Vehicle has been updated");
          }
        );
      } else {
        res.status(404).send("This vehicle does not exist in the database")
      }

    }
  });
});

  module.exports = router

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
  
        // fs.readFile("./data/dealerships.json", "utf8", (_err, _data) => {
        //   if (_err) {
        //     res.status(500).send("Internal server Error");
        //   } else {
        //     const dealershipData = JSON.parse(_data);
        //     const updatedDealershipData = dealershipData.filter((dealership) => {
        //       return dealership.make !== req.params.id;
        //     });
        //     fs.writeFile(
        //       "./data/inventories.json",
        //       JSON.stringify(updatedInventoryData),
        //       () => {
        //         res.json(updatedWarehouseData);
        //       }
        //     );
        //   }
        // });
      }
    });
  });

  module.exports = router

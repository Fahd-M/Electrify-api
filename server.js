require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const vehiclesRoutes = require("./routes/vehiclesRoutes");
const port = process.env.PORT || 8089;
const dealershipRoutes = require("./routes/dealershipRoutes");


app.use(express.json());
app.use(cors());
app.use(express.static('public')); 
app.use("/vehicles", vehiclesRoutes);
app.use("/dealerships", dealershipRoutes);



  

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});
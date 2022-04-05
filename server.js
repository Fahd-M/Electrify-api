require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const vehiclesRoutes = require("./routes/vehiclesRoutes");
const port = process.env.PORT || 8089;
const dealershipRoutes = require("./routes/dealershipRoutes");
const path = require('path');
const multer = require('multer');
const fs = require('fs');

app.use(express.json());
app.use(cors());
app.use(express.static('public')); 
app.use("/vehicles", vehiclesRoutes);
app.use("/dealerships", dealershipRoutes);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/uploadedPhotos')
//   },
//   filename: (req, file, cb) => {
//       //console.log(file)
//     cb(null, Date.now() + path.extname(file.originalName))
//   }
// })

// const upload = multer({ storage: storage }).single('file')

// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         console.log(req.file);
//         console.log(req.body);
//       if (err) {
//         res.sendStatus(500);
//       }
//       res.send(req.file);
//     });
//   });

//   app.post('/fileupload', upload.any(), (req, res) => {
//     console.log(req.files);
//     fs.writeFileSync('test.img', req.files, 'binary');
//     res.send({ success: true });
//   });


  

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});
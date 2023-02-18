const express = require("express");
const router = new express.Router();
const CSV = require("../models/csv");
const fs = require("fs");
const multer = require("multer");
const csv = require("csv-parser");
const fastcsv = require("fast-csv");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "csv/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

// post api to upload folder

router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  // if (file) {
  //   console.log("sucess");
  // }

  if (!file) {
    return res.status(400).send("Please upload a CSV file");
  }

  const options = {
    objectMode: true,
    delimiter: ";",
    quote: null,
    headers: true,
    renameHeaders: false,
  };


  const filePath = file.path;
  const data = [];

  // Read the CSV file
  fs.createReadStream(filePath)
    .pipe(fastcsv.parse(options))
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      // Save the data to the database
      CSV.insertMany(data, (err, result) => {
        if (err) {
          return res.status(500).send(err);
          console.log(err);
        }
        res.send("File uploaded and data saved successfully!");
      });
    });
});

router.get("/csv", async (req, res) => {
  try {
    const data = await CSV.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;

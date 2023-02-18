const express = require("express");
const router = new express.Router();
const Product = require("../models/data");

router.post("/data", async (req, res) => {
  try {
    const {
      operatingGrossMargin,
      operatingProfitRate,
      preTaxNetInterestRate,
      afterTaxNetInterestRate,
      cashFlowpershare,
      perShareNetProfitBeforeTax,
      regularNetProfitGrowthRate,
      quickRatio,
    } = req.body;

    

    const dataCreate = new Product({
      operatingGrossMargin,
      operatingProfitRate,
      preTaxNetInterestRate,
      afterTaxNetInterestRate,
      cashFlowpershare,
      perShareNetProfitBeforeTax,
      regularNetProfitGrowthRate,
      quickRatio,
    });

    const saveProduct = await dataCreate.save();
    console.log(saveProduct);
    res.status(201).send({
      message: "data Successfully Added",
    });
  } catch (error) {
    res.status(400).send(`err ${error}`);
  }
});

router.get("/data", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    const data = await Product.find()
      .limit(limit)
      .skip((page - 1) * limit);
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;

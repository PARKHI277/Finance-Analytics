const express = require("express");
const router = new express.Router();
const Product = require("../models/data");
const CSV = require("../models/csv");

router.get("/pre", async (req, res) => {
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
    } = req.query;
    const Data = await Product.find({
      $and: [
        { operatingGrossMargin },
        { operatingProfitRate },
        { preTaxNetInterestRate },
        { afterTaxNetInterestRate },
        { cashFlowpershare },
        { perShareNetProfitBeforeTax },
        { regularNetProfitGrowthRate },
        { quickRatio },
      ],
    });

    const dataId = Data[0]._id;
    const find = await Product.findById(dataId);

    res.status(200).json(find.bankrupt);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/test", async (req, res) => {
  try {
    const data = await CSV.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});



router.get("/gross", async (req, res) => {
  try {
    const data = await CSV.find();
    const len = data.length;
    let sum = 0;
    for (let k = 0; k < len; k++) {
      sum += data[k].operatingGrossMargin;
    }
    let result = (sum * 100) / len;
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/perProfit", async (req, res) => {
  try {
    const data = await CSV.find();
    const len = data.length;
    let sum = 0;
    for (let k = 0; k < len; k++)
    {
      sum = sum + data[k].perShareNetProfitBeforeTax;
    }
    let result
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})

module.exports = router;

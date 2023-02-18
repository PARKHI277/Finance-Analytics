const express = require("express");
const router = new express.Router();
const Product = require("../models/data");

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


router.post("/csv", async (req, res) => {
    
})

module.exports = router;

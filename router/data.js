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

    // const dataCreate = new Product({
    //   operatingGrossMargin,
    //   operatingProfitRate,
    //   preTaxNetInterestRate,
    //   afterTaxNetInterestRate,
    //   cashFlowpershare,
    //   perShareNetProfitBeforeTax,
    //   regularNetProfitGrowthRate,
    //   quickRatio,
    // });

    // const saveProduct = await dataCreate.save();
    // const Data = await Product.find({
    //   $and: [
    //     { operatingGrossMargin: req.body.operatingGrossMargin },
    //     { operatingProfitRate: req.body.operatingProfitRate },
    //     { preTaxNetInterestRate: req.body.preTaxNetInterestRate },
    //     { afterTaxNetInterestRate: req.body.afterTaxNetInterestRate },
    //     { cashFlowpershare: req.body.cashFlowpershare },
    //     { perShareNetProfitBeforeTax: req.body.perShareNetProfitBeforeTax },
    //     { regularNetProfitGrowthRate: req.body.regularNetProfitGrowthRate },
    //     { quickRatio: req.body.quickRatio },
    //   ],
    // });
    // console.log(Data);
    // const dataId = Data[0]._id;
    // console.log(dataId);
    // const find = await Product.findById(dataId);

    // res.status(201).json(find.bankrupt);

    // const Data = await Product.find({
    //   $and: [
    //     { operatingGrossMargin },
    //     { operatingProfitRate },
    //     { preTaxNetInterestRate },
    //     { afterTaxNetInterestRate },
    //     { cashFlowpershare },
    //     { perShareNetProfitBeforeTax },
    //     { regularNetProfitGrowthRate },
    //     { quickRatio },
    //   ],
    // });
    // console.log(Data);
    // const dataId = Data[0]._id;
    // console.log(dataId);
    // const find = await Product.findById(dataId);
    // console.log(find);
    // res.status(200).json(find.bankrupt);
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

require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const csvSchema = new Schema(
  {
    operatingGrossMargin: {
      type: Number,
    },
    operatingProfitRate: {
      type: Number,
    },
    preTaxNetInterestRate: {
      type: Number,
    },
    afterTaxNetInterestRate: {
      type: Number,
    },
    cashFlowpershare: {
      type: Number,
    },
    perShareNetProfitBeforeTax: {
      type: Number,
    },
    regularNetProfitGrowthRate: {
      type: Number,
    },
    quickRatio: {
      type: Number,
    },
   
  },
  { timestamps: true }
);

const csvData = new mongoose.model("csvdata", csvSchema);
module.exports = csvData;

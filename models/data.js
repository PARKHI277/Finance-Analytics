require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dataSchema = new Schema(
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
    bankrupt: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const data = new mongoose.model("Data", dataSchema);
module.exports = data;

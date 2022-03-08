const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    customername: {
    type: String,
  },
  costOfBigSize: {
    type: Number,
  },
  numberOfBigSize: {
    type: Number,
  },
  costOfMeduimSize: {
    type: Number,
  },
  numberOfMeduimSize: {
    type: Number,
  },
  costOfMyBottles: {
    type: Number,
  },
  numberOfMyBottles: {
    type: Number,
  },
  total: {
    type: Number,
  },
  date: {
    type: String,
  },
  paid:{
    type:Boolean,
    default:true
  }
});
const order = mongoose.model("Orders", orderSchema);
module.exports = order;

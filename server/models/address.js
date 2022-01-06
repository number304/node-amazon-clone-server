const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  country: String,
  fullname: String,
  streetAddress: String,
  city: String,
  state: String,
  zipcode: Number,
  phoneNumber: Number,
  deliverInstructions: String,
  securityCode: String,
});

module.exports = mongoose.model("Address", AddressSchema);

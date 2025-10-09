const mongoose = require('mongoose');

const dataSchemaObject = new mongoose.Schema({
  FirstName: { type: String, required: true },
  MiddleName: { type: String },
  LastName: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  PhoneNumber: { type: String },
  AddressLine1: { type: String, required: true },
  AddressLine2: { type: String },
  Province: { type: String },
  Postcode: { type: String },
  Country: { type: String }
});

let mongooseSchema = new mongoose.Schema(dataSchemaObject);
module.exports = mongoose.model('Contact', mongooseSchema);

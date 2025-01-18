const mongoose = require('mongoose');

// Define Destination schema
const destinationSchema = new mongoose.Schema({
  destinationID: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  entryFee: { type: Number, required: true },
  category: { type: String, required: true },
});

// Define methods
destinationSchema.methods.getDetail = function () {
  return {
    name: this.name,
    description: this.description,
    location: this.location,
    image: this.image,
    entryFee: this.entryFee,
  };
};

destinationSchema.methods.updateFee = function (newFee) {
  this.entryFee = newFee;
  return this.save();
};

destinationSchema.methods.updateDescription = function (newDescription) {
  this.description = newDescription;
  return this.save();
};

destinationSchema.statics.searchByCategory = function (category) {
  return this.find({ category: category });
};

destinationSchema.statics.getAvailableDestinations = function () {
  return this.find({});
};

// Create model
const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;

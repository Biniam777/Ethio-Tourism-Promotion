const mongoose = require('mongoose');

// Define Event schema
const eventSchema = new mongoose.Schema({
  eventId: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
});

// Define methods
eventSchema.methods.updateContent = function (newContent) {
  this.content = newContent;
  return this.save();
};

eventSchema.methods.getDetail = function () {
  return {
    title: this.title,
    content: this.content,
    author: this.author,
    category: this.category,
    publishDate: this.publishDate,
  };
};

eventSchema.statics.filterEvent = function (category) {
  return this.find({ category: category });
};

eventSchema.statics.addEvent = function (eventData) {
  const newEvent = new this(eventData);
  return newEvent.save();
};

eventSchema.statics.getByLocation = function (location) {
  return this.find({ location: location });
};

// Create model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

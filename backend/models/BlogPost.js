const mongoose = require('mongoose');

// Define BlogPost schema
const blogPostSchema = new mongoose.Schema({
  postID: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  image: { type: String },
});

// Define methods
blogPostSchema.methods.createBlog = function () {
  return this.save();
};

blogPostSchema.methods.deleteBlog = function () {
  return this.remove();
};

blogPostSchema.methods.editBlog = function (updatedContent) {
  this.content = updatedContent;
  return this.save();
};

// Create model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;

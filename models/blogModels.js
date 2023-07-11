const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50, 
    message: "Title validation failed",
  },
  content: {
    type: String,
    required: true,
    min: 0,
    max: 100,
    message: "Content number must be even",
  },
  author: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50, 
    message: "Author name validation failed",
  },
});
const blog = mongoose.model("blog", schema);
module.exports = blog;

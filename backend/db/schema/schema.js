const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = new mongoose.model("Todo", todoSchema);

module.exports = {
  Todo,
};

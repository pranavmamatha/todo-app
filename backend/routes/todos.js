const express = require("express");
const router = express.Router();
const { idCheckMiddleware } = require("../middleware/middleware");
const { Todo } = require("../db/schema/schema");

router.get("/", idCheckMiddleware, async (req, res) => {
  try {
    let todos = await Todo.find({});
    res.status(201).send(todos);
  } catch (error) {
    res.status(400).json({
      message: "Error while fetching the todos",
      error: error.message,
    });
  }
});

router.post("/create-todo", idCheckMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const createTodo = await Todo.create(req.body);
    res.status(201).json({
      message: "Created Todo Sucessfully",
      data: createTodo,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error occured while creating todo",
      error: error.message,
    });
  }
});

router.put("/update-todo/:id", idCheckMiddleware, async (req, res) => {
  try {
    const _id = { _id: req.params["id"] };
    const updateTodo = await Todo.findOneAndUpdate(_id, req.body);
    res.status(201).json({
      message: "Updated Todo sucessfully",
      previous_Todo: updateTodo,
    });
  } catch (error) {
    res.status(400).json({
      message:
        "Error while updating the todo. May be internal server error or Todo id is not found",
      error: error.message,
    });
  }
});

router.delete("/delete-todo/:id", idCheckMiddleware, async (req, res) => {
  try {
    const _id = { _id: req.params["id"] };
    const deleteTodo = await Todo.findOneAndDelete(_id);
    res.status(201).json({
      message: "Successfully deleted todo",
      deleted_Todo: deleteTodo,
    });
  } catch (error) {
    res.status(400).json({
      message:
        "Error while deleting the todo or Todo ID might not be found or exist",
      error: error.message,
    });
  }
});

module.exports = router;

const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Tâche introuvable"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Tâche introuvable"
      });
    }

    res.status(200).json({
      message: "Tâche supprimée"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
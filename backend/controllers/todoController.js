const Task = require('../models/Task');

exports.getTodos = async (req, res) => {
  console.log('get:', req.user.id);
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

exports.createTodo = async (req, res) => {
  const { task } = req.body;
  console.log('add', req.user.id);
  const newTask = await Task.create({ task, userId: req.user.id });
  // console.log(newTask);
  //created
  res.status(201).json(newTask);
};

exports.updateTodo = async (req, res) => {
  const { task } = req.body;
  console.log('updated', req.user.id);
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { task },
    { new: true }
  );
  // not found
  if (!updated) return res.status(404).json({ error: 'Task not found' });
  res.json(updated);
};

exports.deleteTodo = async (req, res) => {
  console.log('deleteede:', req.user.id);
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  //no content
  res.status(204).end();
};

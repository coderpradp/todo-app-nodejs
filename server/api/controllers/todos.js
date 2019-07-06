const mongoose = require('mongoose')
const Todo = require('../models/todo')

exports.todos_get_all = (req, res) => {
  Todo.find()
    .select('description done _id')
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.todos_create_todo = (req, res) => {
  const todo = new Todo({
    _id: mongoose.Types.ObjectId(),
    description: req.body.description
  })
  todo
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Todo added',
        createdTodo: {
          description: result.description,
          done: result.done
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.todos_update_done_status = (req, res) => {
  const id = req.params.todoId
  Todo.findById(id)
    .exec()
    .then(result => {
      result.done = !result.done // eslint-disable-line no-param-reassign
      return result.save()
    })
    .then(result => {
      res.status(200).json({
        message: 'Done status updated',
        result
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.todos_delete_todo = (req, res) => {
  const id = req.params.todoId
  Todo.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Todo deleted successfully'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

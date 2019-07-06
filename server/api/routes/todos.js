const express = require('express')

const router = express.Router()
const TodosController = require('../controllers/todos')

// Get Todos
router.get('/', TodosController.todos_get_all)

// Add Todo
router.post('/', TodosController.todos_create_todo)

// Delete Todo
router.delete('/:todoId', TodosController.todos_delete_todo)

// Update Todo's done status
router.post('/:todoId/completed', TodosController.todos_update_done_status)

module.exports = router

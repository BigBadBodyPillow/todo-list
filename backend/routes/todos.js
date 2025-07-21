const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const { requireAuth } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(requireAuth); 

router.get('/', getTodos);
router.post('/', validateRequest, createTodo);
router.put('/:id', validateRequest, updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;

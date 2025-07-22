const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

//check jwt token
const { requireAuth } = require('../middleware/authMiddleware');
//validate inputs
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', getTodos);
router.post('/', validateRequest, createTodo);
router.put('/:id', validateRequest, updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;

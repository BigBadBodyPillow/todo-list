import React from 'react';
import TaskItem from './TaskItem';

function TodoList({
  tasks,
  startEdit,
  handleDelete,
  editTaskId,
  editTaskText,
  setEditTaskText,
  saveEdit,
  cancelEdit,
}) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          startEdit={startEdit}
          handleDelete={handleDelete}
          editTaskId={editTaskId}
          editTaskText={editTaskText}
          setEditTaskText={setEditTaskText}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;

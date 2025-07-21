import React from 'react';
import '../Styles/TaskItem.css';

function TaskItem({
  task,
  startEdit,
  handleDelete,
  editTaskId,
  editTaskText,
  setEditTaskText,
  saveEdit,
  cancelEdit,
}) {
  return (
    <li>
      {editTaskId === task._id ? (
        // when editing
        <>
          <input
            type="text"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
            maxLength={140}
          />
          <div className="button-group">
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        </>
      ) : (
        // default
        <>
          <p className="task-content">{task.task}</p>
          <div className="button-group">
            <button onClick={() => startEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;

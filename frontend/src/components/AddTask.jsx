//css
import '../Styles/AddTask.css';

function AddTask({ newTask, setNewTask, handleAddTask, errorMessage }) {
  return (
    <div className="add-task">
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Your next task"
        />
        {/* error */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;

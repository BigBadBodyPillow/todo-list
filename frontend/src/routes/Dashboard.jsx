import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
// import { Link } from 'react-router-dom';

//components
import AddTask from '../components/AddTask';
import TodoList from '../components/TodoList';
// import TaskItem from '../components/TaskItem';

//css
import '../Styles/Dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!isLoggedIn) return navigate('/login');

    api
      .get('/todos')
      .then((res) => setTasks(res.data))
      .catch(() => navigate('/login'));
  }, []);

  // add
  const handleAddTask = async (e) => {
    e.preventDefault();
    // if (newTask.length > 140) return alert('asdasd');

    // check lengths
    if (newTask.length > 140) {
      setErrorMessage('Too many characters! (max 140)');
      return;
    } else if (newTask.length < 1) {
      setErrorMessage('Cant add an empty task!');
      return;
    }

    try {
      await api.post('/todos', { task: newTask });
      const res = await api.get('/todos');
      setTasks(res.data);
      //clear
      setNewTask('');
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Failed to add task');
    }
  };

  //delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setErrorMessage('Failed to delete task');
    }
  };

  const startEdit = (task) => {
    setEditTaskId(task._id);
    setEditTaskText(task.task);
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskText('');
    setErrorMessage('');
  };

  //update
  const saveEdit = async () => {
    if (editTaskText.length > 140) {
      setErrorMessage('Too many characters! (max 140)');
      return;
    }
    try {
      await api.put(`/todos/${editTaskId}`, { task: editTaskText });
      const res = await api.get('/todos');
      setTasks(res.data);
      cancelEdit();
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Failed to update task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <main>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        {/* add */}
        <AddTask
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          errorMessage={errorMessage}
        />
        <hr />
        {/* list */}
        <TodoList
          tasks={tasks}
          startEdit={startEdit}
          handleDelete={handleDelete}
          editTaskId={editTaskId}
          editTaskText={editTaskText}
          setEditTaskText={setEditTaskText}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      </main>
    </div>
  );
}

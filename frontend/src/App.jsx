import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';
import Register from './routes/Register';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';

const token = localStorage.getItem('token');

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* if there is a token, go to dashboard by default */}
          <Route
            path="/"
            element={<Navigate to={token ? '/dashboard' : '/login'} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

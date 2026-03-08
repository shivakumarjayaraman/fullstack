import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Session 13 exercise: Reusable header with app title and navigation.
 */
function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '1.25rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Full Stack Training</Link>
      </h1>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/counter">Counter</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

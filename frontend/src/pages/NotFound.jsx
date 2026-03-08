import { Link } from 'react-router-dom';

/**
 * Session 16: 404 page — replace the Navigate catch-all in App.jsx with this.
 */
function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default NotFound;

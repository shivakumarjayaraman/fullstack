import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserService from '../services/userService';

/**
 * Session 16: Dynamic route /users/:id using useParams.
 */
function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    UserService.getUserById(id)
      .then(setUser)
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>User Profile</h2>
      <dl>
        <dt><strong>Username:</strong></dt><dd>{user.username}</dd>
        <dt><strong>Email:</strong></dt><dd>{user.email}</dd>
        {user.firstName && <><dt><strong>First Name:</strong></dt><dd>{user.firstName}</dd></>}
        {user.lastName && <><dt><strong>Last Name:</strong></dt><dd>{user.lastName}</dd></>}
      </dl>
      <Link to="/users">← Back to Users</Link>
    </div>
  );
}

export default UserProfile;

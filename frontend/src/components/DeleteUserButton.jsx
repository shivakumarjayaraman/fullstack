import { useState } from 'react';
import UserService from '../services/userService';

/**
 * Session 20: Delete button with inline confirmation dialog.
 */
function DeleteUserButton({ userId, username, onDeleted }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await UserService.deleteUser(userId);
      onDeleted?.(userId);
    } catch (err) {
      alert('Failed to delete user: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <span>
        Delete <strong>{username}</strong>?{' '}
        <button onClick={handleDelete} disabled={loading} style={{ color: 'red' }}>
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </button>{' '}
        <button onClick={() => setConfirming(false)}>Cancel</button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} style={{ color: 'red' }}>
      Delete
    </button>
  );
}

export default DeleteUserButton;

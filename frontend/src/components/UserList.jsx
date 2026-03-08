import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import UserCardSkeleton from './UserCardSkeleton';
import EmptyState from './EmptyState';
import ErrorDisplay from './ErrorDisplay';
import DeleteUserButton from './DeleteUserButton';
import UserModal from './UserModal';

/**
 * Session 20: Full-featured user table with search, pagination, create/edit modal,
 * optimistic delete, useCallback, and useMemo.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const PAGE_SIZE = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/users/paged?page=${page}&size=${PAGE_SIZE}`);
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // Session 21: useMemo for filtered list
  const filteredUsers = useMemo(() =>
    users.filter(u =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    ), [users, searchTerm]);

  // Session 20: optimistic delete
  const handleDeleted = useCallback((deletedId) => {
    setUsers(prev => prev.filter(u => u.id !== deletedId));
  }, []);

  const handleCreated = (newUser) => {
    setUsers(prev => [newUser, ...prev]);
    setModalOpen(false);
  };

  const handleUpdated = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
    setModalOpen(false);
  };

  const openEdit = (user) => { setEditingUser(user); setModalOpen(true); };
  const openCreate = () => { setEditingUser(null); setModalOpen(true); };

  if (loading) return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {[...Array(4)].map((_, i) => <UserCardSkeleton key={i} />)}
    </div>
  );

  if (error) return <ErrorDisplay message={error} onRetry={fetchUsers} />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Users</h2>
        <button onClick={openCreate}>+ New User</button>
      </div>

      <input
        type="search"
        placeholder="Search by username or email..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', boxSizing: 'border-box' }}
      />

      {filteredUsers.length === 0 ? (
        <EmptyState message="No users found." actionLabel="Create User" onAction={openCreate} />
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #dee2e6' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Username</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '0.5rem' }}>{user.id}</td>
                <td style={{ padding: '0.5rem' }}>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td style={{ padding: '0.5rem' }}>{user.email}</td>
                <td style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEdit(user)}>Edit</button>
                  <DeleteUserButton userId={user.id} username={user.username} onDeleted={handleDeleted} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
          <button onClick={() => setPage(p => p - 1)} disabled={page === 0}>Previous</button>
          <span>Page {page + 1} of {totalPages}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}>Next</button>
        </div>
      )}

      <UserModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingUser(null); }}
        mode={editingUser ? 'edit' : 'create'}
        user={editingUser}
        onSuccess={editingUser ? handleUpdated : handleCreated}
      />
    </div>
  );
}

export default UserList;

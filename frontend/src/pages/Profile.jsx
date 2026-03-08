import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import UserService from '../services/userService';

/**
 * Session 19: View and edit the currently authenticated user's profile.
 */
function Profile() {
  const { user, login } = useAuth();
  const [values, setValues] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => setValues(v => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');
    try {
      const updated = await UserService.updateUser(user.id, values);
      login({ ...user, ...updated });
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>My Profile</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormInput id="email" label="Email" type="email" value={values.email} onChange={handleChange('email')} required />
        <FormInput id="firstName" label="First Name" value={values.firstName} onChange={handleChange('firstName')} />
        <FormInput id="lastName" label="Last Name" value={values.lastName} onChange={handleChange('lastName')} />
        <FormInput id="password" label="New Password (leave blank to keep current)" type="password" value={values.password} onChange={handleChange('password')} />
        <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  );
}

export default Profile;

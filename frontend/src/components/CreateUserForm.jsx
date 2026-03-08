import { useState } from 'react';
import FormInput from './FormInput';
import UserService from '../services/userService';

/**
 * Session 20: Controlled form for creating a new user (admin use).
 */
function CreateUserForm({ onSuccess, onCancel }) {
  const [values, setValues] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!values.username) errs.username = 'Username is required';
    if (!values.email) errs.email = 'Email is required';
    if (!values.password || values.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleChange = (field) => (e) => setValues(v => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const created = await UserService.createUser(values);
      onSuccess?.(created);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to create user' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.submit && <p style={{ color: 'red' }}>{errors.submit}</p>}
      <FormInput id="username" label="Username" value={values.username} onChange={handleChange('username')} error={errors.username} required />
      <FormInput id="email" label="Email" type="email" value={values.email} onChange={handleChange('email')} error={errors.email} required />
      <FormInput id="password" label="Password" type="password" value={values.password} onChange={handleChange('password')} error={errors.password} required />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Create User'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default CreateUserForm;

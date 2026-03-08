import { useState } from 'react';
import FormInput from './FormInput';
import UserService from '../services/userService';

/**
 * Session 20: Pre-populated form for editing an existing user.
 */
function EditUserForm({ user, onSuccess, onCancel }) {
  const [values, setValues] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => setValues(v => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email) { setErrors({ email: 'Email is required' }); return; }

    setSubmitting(true);
    try {
      const updated = await UserService.updateUser(user.id, values);
      onSuccess?.(updated);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to update user' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.submit && <p style={{ color: 'red' }}>{errors.submit}</p>}
      <FormInput id="email" label="Email" type="email" value={values.email} onChange={handleChange('email')} error={errors.email} required />
      <FormInput id="firstName" label="First Name" value={values.firstName} onChange={handleChange('firstName')} />
      <FormInput id="lastName" label="Last Name" value={values.lastName} onChange={handleChange('lastName')} />
      <FormInput id="password" label="New Password (leave blank to keep current)" type="password" value={values.password} onChange={handleChange('password')} />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save Changes'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default EditUserForm;

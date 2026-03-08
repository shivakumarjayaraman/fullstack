/**
 * Session 22: Reusable labeled input with inline validation error and accessibility attributes.
 */
function FormInput({ id, label, type = 'text', value, onChange, onBlur, error, required }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
        {label}{required && ' *'}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: `1px solid ${error ? '#dc3545' : '#ced4da'}`,
          borderRadius: '4px',
          boxSizing: 'border-box',
        }}
      />
      {error && (
        <span id={`${id}-error`} role="alert" style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default FormInput;

/**
 * Session 22: Empty state display with message and optional action.
 */
function EmptyState({ message = 'Nothing to show here.', actionLabel, onAction }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d' }}>
      <p style={{ fontSize: '1.1rem' }}>{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} style={{ marginTop: '1rem' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;

/**
 * Session 22: Standalone error display with optional retry button.
 */
function ErrorDisplay({ message, onRetry }) {
  return (
    <div role="alert" style={{ padding: '1rem', border: '1px solid #f5c6cb', borderRadius: '4px', backgroundColor: '#f8d7da', color: '#721c24' }}>
      <p style={{ margin: '0 0 0.5rem' }}><strong>Something went wrong:</strong> {message}</p>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: '0.5rem' }}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorDisplay;

/**
 * Session 22: Accessible progress bar.
 * Props: value (0-100), label
 */
function ProgressBar({ value = 0, label }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div>
      {label && <p style={{ marginBottom: '0.25rem' }}>{label}: {clamped}%</p>}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ height: '12px', backgroundColor: '#e9ecef', borderRadius: '6px', overflow: 'hidden' }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            backgroundColor: '#007bff',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;

/**
 * Session 22: Skeleton placeholder that matches UserCard dimensions.
 * Show while data is loading to avoid layout shift.
 */
function UserCardSkeleton() {
  const shimmer = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '4px',
  };

  return (
    <>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
      <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem', width: '200px' }}>
        <div style={{ ...shimmer, height: '1rem', marginBottom: '0.5rem' }} />
        <div style={{ ...shimmer, height: '0.8rem', width: '70%', marginBottom: '0.5rem' }} />
        <div style={{ ...shimmer, height: '0.8rem', width: '50%' }} />
      </div>
    </>
  );
}

export default UserCardSkeleton;

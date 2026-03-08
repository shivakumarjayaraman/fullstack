import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Session 21: Generic modal using React createPortal.
 * Renders into document.body, outside the component tree.
 *
 * Usage:
 *   <Modal isOpen={open} onClose={() => setOpen(false)} title="Edit User">
 *     <SomeForm />
 *   </Modal>
 */
function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '8px', padding: '2rem',
          minWidth: '320px', maxWidth: '600px', width: '100%'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;

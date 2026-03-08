import Modal from './Modal';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';

/**
 * Session 20: Modal wrapper for create/edit user forms.
 * Pass mode="create" or mode="edit" with a user object for editing.
 */
function UserModal({ isOpen, onClose, mode = 'create', user, onSuccess }) {
  const handleSuccess = (result) => {
    onSuccess?.(result);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Create New User' : 'Edit User'}
    >
      {mode === 'create' ? (
        <CreateUserForm onSuccess={handleSuccess} onCancel={onClose} />
      ) : (
        <EditUserForm user={user} onSuccess={handleSuccess} onCancel={onClose} />
      )}
    </Modal>
  );
}

export default UserModal;

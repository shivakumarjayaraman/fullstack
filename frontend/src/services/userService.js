import api from './api';

const UserService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Create user
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Search users by username
  searchUsers: async (username) => {
    try {
      const response = await api.get(`/users/username/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }
};

export default UserService;

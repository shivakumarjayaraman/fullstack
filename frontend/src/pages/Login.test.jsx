import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';

vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
}));

import api from '../services/api';

describe('Login', () => {
  afterEach(() => vi.clearAllMocks());

  test('renders username and password fields', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('calls api.post on submit', async () => {
    api.post.mockResolvedValue({ data: { token: 'test-token', user: { username: 'alice' } } });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'alice' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/login', { username: 'alice', password: 'password' });
    });
  });
});

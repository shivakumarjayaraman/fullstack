import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import UserList from './UserList';

// Mock the api module
vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

import api from '../services/api';

const mockPagedResponse = {
  data: {
    content: [
      { id: 1, username: 'alice', email: 'alice@example.com' },
      { id: 2, username: 'bob', email: 'bob@example.com' },
    ],
    totalPages: 1,
  },
};

describe('UserList', () => {
  beforeEach(() => {
    api.get.mockResolvedValue(mockPagedResponse);
  });

  afterEach(() => { vi.clearAllMocks(); });

  test('renders user names after fetch', async () => {
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('alice')).toBeInTheDocument();
      expect(screen.getByText('bob')).toBeInTheDocument();
    });
  });

  test('shows empty state when no users', async () => {
    api.get.mockResolvedValue({ data: { content: [], totalPages: 0 } });

    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no users found/i)).toBeInTheDocument();
    });
  });
});

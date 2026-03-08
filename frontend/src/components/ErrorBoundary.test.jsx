import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Component that throws on render
function BrokenComponent() {
  throw new Error('Test error from BrokenComponent');
}

// Suppress console.error output during this test
beforeEach(() => { vi.spyOn(console, 'error').mockImplementation(() => {}); });
afterEach(() => { console.error.mockRestore(); });

describe('ErrorBoundary', () => {
  test('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <p>Everything is fine</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  test('renders fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});

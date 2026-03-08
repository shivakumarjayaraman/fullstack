import { Outlet } from 'react-router-dom';
import Header from './Header';

/**
 * Session 16: Layout wrapper using <Outlet> for nested routes.
 * Wrap authenticated routes with this in App.jsx.
 */
function Layout() {
  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

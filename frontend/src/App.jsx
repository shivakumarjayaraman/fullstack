import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Spinner from './components/Spinner';

// Eagerly loaded (needed on first paint)
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Session 16: Lazy-loaded pages
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import Hello from './components/Hello';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              <Routes>
                {/* Public routes — wrapped in Layout (Header + Outlet) */}
                <Route element={<Layout />}>
                  <Route path="/" element={
                    <div>
                      <h1>Welcome to Full Stack Training</h1>
                      <p>React + Spring Boot Application</p>
                      <Hello />
                    </div>
                  } />
                  <Route path="/counter" element={<Counter />} />
                  <Route path="/todos" element={<TodoList />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/:id" element={<UserProfile />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute><Profile /></ProtectedRoute>
                  } />

                  {/* Admin-only routes */}
                  <Route path="/admin/*" element={
                    <AdminRoute><div><h2>Admin Panel</h2></div></AdminRoute>
                  } />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

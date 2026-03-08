import { useTheme } from '../context/ThemeContext';

/**
 * Session 22: Button that toggles light/dark theme via ThemeContext.
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{ cursor: 'pointer', padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

export default ThemeToggle;

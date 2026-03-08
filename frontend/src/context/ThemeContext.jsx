import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Session 15/22: Theme context providing light/dark mode.
 * Sets data-theme="light"|"dark" on document.documentElement for CSS variable switching.
 *
 * Usage:
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 *
 *   const { theme, toggleTheme } = useTheme();
 */
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

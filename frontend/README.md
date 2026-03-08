# Training Frontend - React Application

This is the frontend application for the Full Stack Development Training Course.

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8080`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components
├── services/       # API service layer
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── App.jsx         # Main App component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

## API Integration

The frontend is configured to proxy API requests to the backend:
- Development: `http://localhost:8080/api`
- Configured in `vite.config.js`

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Development Tips

1. **Hot Module Replacement:** Changes are reflected immediately
2. **React DevTools:** Install browser extension for debugging
3. **API Testing:** Use Postman or browser DevTools
4. **State Management:** Start with React hooks, add Redux if needed

## Next Steps

- Session 13: React Introduction
- Session 14: React Components and Props
- Session 15: React Hooks

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { setupInterceptors } from '@/services/axios';
import App from '@/App';
import '@/styles/globals.css';

setupInterceptors();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

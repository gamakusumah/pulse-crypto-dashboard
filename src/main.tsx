import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { setupInterceptors } from '@/services/axios';
import { i18nReady } from '@/lib/i18n';
import App from '@/App';
import '@/styles/globals.css';

setupInterceptors();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

await i18nReady;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

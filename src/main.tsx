import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './globals.css';
import { initializeApp } from 'firebase/app';
import { App } from '@/features/app';
import { UserCredentialProvider } from './features/auth';
import { firebaseConfig } from './utils/firebase';

// Initialize firebase
initializeApp(firebaseConfig);

const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(
    <React.StrictMode>
      <BrowserRouter>
        <UserCredentialProvider>
          <App />
        </UserCredentialProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}

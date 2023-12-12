import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './globals.css';
import type { FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { z } from 'zod';
import { App } from '@/features/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: z.string().parse(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: z.string().parse(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: z.string().parse(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: z.string().parse(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: z
    .string()
    .parse(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: z.string().parse(import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: z.string().parse(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
};

// Initialize Firebase
initializeApp(firebaseConfig);

const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}

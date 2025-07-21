import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';

import './index.css';
import RainbowLine from './components/RainbowLine';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RainbowLine />
    <App />
  </StrictMode>
);

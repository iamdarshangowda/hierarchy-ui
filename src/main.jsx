import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToggleContextWrapper } from './context/ToggleContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToggleContextWrapper>
      <App />
    </ToggleContextWrapper>
  </React.StrictMode>
);

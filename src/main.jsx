import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToggleContextWrapper } from './context/ToggleContext.jsx';
import { EmployeeContextWrapper } from './context/EmployeeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToggleContextWrapper>
      <EmployeeContextWrapper>
        <App />
      </EmployeeContextWrapper>
    </ToggleContextWrapper>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { ExpensesProvider } from './context/ExpensesProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExpensesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ExpensesProvider>
  </React.StrictMode>
);

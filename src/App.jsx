import React from 'react';
import Dashboard from './pages/Dashboard';
import { ExpensesProvider } from './context/ExpensesProvider';
import './App.css';

export default function App() {
  return (
    <ExpensesProvider>
      <div className="app-root">
        <Dashboard />
      </div>
    </ExpensesProvider>
  );
}
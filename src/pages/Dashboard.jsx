import React from 'react';
import Header from '../components/Header'; 
import ExpenseForm from '../components/ExpenseForm'; 
import ExpenseList from '../components/ExpenseList'; 
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      
      <Header />

      <div className="dashboard-grid">
        
        <div className="dashboard-col-left">
          <ExpenseForm />
        </div>

        <div className="dashboard-col-right">
          <ExpenseList />
        </div>
        
      </div>
    </div>
  );
}
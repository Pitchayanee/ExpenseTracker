import React from 'react';
import { useExpenses } from '../context/ExpensesContext';
import { formatCurrency } from '../utils/format';
import './Header.css';

const SummaryCard = ({ title, amount, color }) => (
  <div className={`summary-card ${color}`}>
    <h3>{title}</h3>
    <p>{amount}</p>
  </div>
);

export default function Header() {
  const { totalAmount, displayedExpenses, filterPeriod, exportData, importData } = useExpenses();
  const fileInputRef = React.useRef(null);
  
  const maxExpense = displayedExpenses.length > 0 
    ? Math.max(...displayedExpenses.map(i => i.amount)) 
    : 0;
    
  const periodName = 
    filterPeriod === '7days' ? '7 วันล่าสุด' : 
    filterPeriod === '30days' ? '30 วันล่าสุด' : 
    'ทั้งหมด';

  return (
    <header className="header-container">
      <div className="header-card">
        <div className="header-top">
          <div className="header-title-section">
            <h1>Expense Tracker</h1>
            <p>&copy;copyright 2025 by Pitchayanee Phokhem</p>
          </div>
          <div className="header-total-section">
            <p className="header-total-label">ยอดรวม ({periodName})</p>
            <p className="header-total-amount">{formatCurrency(totalAmount)}</p>
          </div>
        </div>
        
        {/* Export/Import Buttons */}
        <div className="export-import-buttons">
          <button onClick={exportData} className="export-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export ข้อมูล
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="import-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import ข้อมูล
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.json"
            onChange={importData}
            className="file-input-hidden"
          />
        </div>
      </div>
      
      {/* Dashboard */}
      <div className="summary-grid">
        <SummaryCard title="จำนวนรายการ" amount={`${displayedExpenses.length} รายการ`} />
        <SummaryCard title="ยอดรวมรายจ่าย" amount={formatCurrency(totalAmount)}  />
        <SummaryCard title="รายการที่แพงที่สุด" amount={formatCurrency(maxExpense)}  />
      </div>
    </header>
  );
}
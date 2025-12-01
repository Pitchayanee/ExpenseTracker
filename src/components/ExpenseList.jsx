import React from 'react';
import { useExpenses } from '../context/ExpensesContext';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

// Component ปุ่ม Filter (ย้ายออกมาข้างนอก)
const FilterButton = ({ label, value, isActive, onClick }) => (
  <button 
    onClick={() => onClick(value)}
    className={`filter-button ${isActive ? 'active' : 'inactive'}`}
  >
    {label}
  </button>
);

export default function ExpenseList() {
  const { displayedExpenses, filterPeriod, setFilterPeriod } = useExpenses();

  return (
    <div className="expense-list-root">
      <div className="list-header">
        <h2 className="expense-form-title list-title">ประวัติรายจ่าย</h2>
        <div className="filter-buttons">
          <FilterButton label="ทั้งหมด" value="all" isActive={filterPeriod === 'all'} onClick={setFilterPeriod} />
          <FilterButton label="7 วัน" value="7days" isActive={filterPeriod === '7days'} onClick={setFilterPeriod} />
          <FilterButton label="30 วัน" value="30days" isActive={filterPeriod === '30days'} onClick={setFilterPeriod} />
        </div>
      </div>

      {/* รายการ Expenses */}
      <div className="space-y-3">
        {displayedExpenses.length === 0 ? (
          <div className="empty-state">
            <p className="text-gray-500">ไม่มีรายการในช่วงเวลานี้</p>
          </div>
        ) : (
          displayedExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        )}
      </div>
    </div>
  );
}
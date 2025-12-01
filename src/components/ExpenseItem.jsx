import React from 'react';
import { useExpenses } from '../context/ExpensesContext';
import { formatCurrency } from '../utils/format';
import './ExpenseItem.css';


export default function ExpenseItem({ expense }) {
  const { deleteExpense } = useExpenses();
  
  const formattedDate = new Date(expense.date).toLocaleDateString('th-TH', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  });

  return (
    <div className="expense-item-root">
      <div className="meta">
        <div>
          <p className="expense-title">{expense.title}</p>
          <p className="expense-meta">
            <span>{formattedDate}</span>
            <span className="sep">•</span>
            <span className="expense-category">{expense.category}</span>
          </p>
        </div>
      </div>

      <div className="controls">
        <span className="amount">{formatCurrency(expense.amount)}</span>
        <button onClick={() => deleteExpense(expense.id)} className="delete-btn" title="ลบรายการนี้">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-small" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
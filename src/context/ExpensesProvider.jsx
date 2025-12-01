import React, { useState, useMemo } from 'react';
import { useLocalStorage } from '../services/storage'; 
import { ExpensesContext } from './ExpensesContext';

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useLocalStorage('myExpenseTracker', []);
  
  // State Filter
  const [filterPeriod, setFilterPeriod] = useState('all');

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(), 
      amount: parseFloat(expense.amount),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(expenses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          setExpenses(importedData);
          alert('นำเข้าข้อมูลสำเร็จ!');
        } else {
          alert('รูปแบบไฟล์ไม่ถูกต้อง');
        }
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการอ่านไฟล์');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
  };
  
  const displayedExpenses = useMemo(() => {
    const today = new Date();
    
    return expenses.filter(item => {
      if (filterPeriod === 'all') return true;

      const itemDate = new Date(item.date);
      const diffTime = Math.abs(today - itemDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (filterPeriod === '7days') return diffDays <= 7;
      if (filterPeriod === '30days') return diffDays <= 30;
      
      return true;
    });
  }, [expenses, filterPeriod]);

  // Sum
  const totalAmount = useMemo(() => {
    return displayedExpenses.reduce((sum, item) => sum + item.amount, 0);
  }, [displayedExpenses]);
  
  const contextValue = {
    // Data
    expenses,
    filterPeriod,
    displayedExpenses,
    totalAmount,
    
    // Functions
    setFilterPeriod,
    addExpense,
    deleteExpense,
    exportData,
    importData,
  };

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
}
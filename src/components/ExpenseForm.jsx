import React, { useState } from 'react';
import { useExpenses } from '../context/ExpensesContext';
import './ExpenseForm.css';

export default function ExpenseForm() {
  // ดึงฟังก์ชัน addExpense มาจาก Context
  const { addExpense } = useExpenses();
  
  // State สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0] // วันที่ปัจจุบัน
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || parseFloat(formData.amount) <= 0) {
      // alert
      console.log("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
      return;
    }
    
    addExpense(formData);
    
    setFormData({ 
      ...formData, 
      title: '', 
      amount: '',
      date: new Date().toISOString().split('T')[0] 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form-root">
      <h2 className="expense-form-title">เพิ่มรายการใหม่</h2>
      
      {/* ชื่อรายการ */}
      <div>
        <label className="form-label">รายการ</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="เช่น ข้าวมันไก่, ค่าเดินทาง"
          className="input"
          required
        />
      </div>

      <div className="grid-2">
        {/* ราคา */}
        <div>
          <label className="form-label">ราคา (บาท)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="input"
            required
            min="0"
            step="1"
          />
        </div>
        {/* หมวดหมู่ */}
        <div>
           <label className="form-label">หมวดหมู่</label>
           <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input select"
           >
             <option value="food">อาหาร</option>
             <option value="transport">เดินทาง</option>
             <option value="shopping">ช้อปปิ้ง</option>
             <option value="bills">บิล</option>
             <option value="other">อื่นๆ</option>
           </select>
        </div>
      </div>

      <div>
        <label className="form-label">วันที่</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary full-width">
        + บันทึกรายจ่าย
      </button>
    </form>
  );
}
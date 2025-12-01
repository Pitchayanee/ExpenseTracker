import { createContext, useContext } from 'react';

// สร้าง Context สำหรับจัดการข้อมูลรายจ่าย
export const ExpensesContext = createContext(null);

// Custom Hook เพื่อใช้งาน Context ได้ง่ายขึ้น
export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses must be used within ExpensesProvider');
  }
  return context;
}

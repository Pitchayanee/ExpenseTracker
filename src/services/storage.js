import { useState, useEffect } from 'react';

// Custom Hook สำหรับการเก็บ State ใน Local Storage
// ถูกจัดอยู่ใน services เพราะเกี่ยวข้องกับการจัดการข้อมูลภายนอก (storage)
export function useLocalStorage(key, initialValue) {
  // 1. กำหนดค่าเริ่มต้น: โหลดจาก Local Storage ถ้ามี, ไม่งั้นใช้ค่าเริ่มต้น
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”:", error);
      return initialValue;
    }
  });

  // 2. useEffect: บันทึกข้อมูลลง Local Storage ทุกครั้งที่ 'value' เปลี่ยน
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage key “" + key + "”:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
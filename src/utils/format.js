export const formatCurrency = (amount) => {
  if (amount == null) return '฿0';

  let num = null;

  if (typeof amount === 'number' && !Number.isNaN(amount)) {
    num = amount;
  } else if (typeof amount === 'string') {
    const s = amount.trim().replace(/,/g, '.');
    const m = s.match(/^[-+]?\d+(?:\.\d+)?/);
    if (m) num = parseFloat(m[0]);
  }

  if (num == null || Number.isNaN(num)) return '฿0';


  const formatted = num.toLocaleString('th-TH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return '฿' + formatted;
};
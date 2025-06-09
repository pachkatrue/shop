export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');

  if (numbers.startsWith('8')) {
    return numbers.replace(/^8/, '7');
  }

  if (numbers.startsWith('7')) {
    return numbers.slice(0, 11);
  }

  return '7' + numbers.slice(0, 10);
};

export const maskPhone = (value: string): string => {
  const numbers = formatPhone(value);

  if (numbers.length <= 1) return '+7 ';
  if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
  if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
  if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;

  return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
};

export const isPhoneValid = (phone: string): boolean => {
  const numbers = formatPhone(phone);
  return numbers.length === 11 && numbers.startsWith('7');
};
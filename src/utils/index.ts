// Export tất cả các utility functions
export * from "./validation";

// Các hàm tiện ích khác có thể thêm vào đây
export const formatPhoneNumber = (phone: string): string => {
  // Định dạng số điện thoại Việt Nam
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10 && cleaned.startsWith("0")) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("vi-VN");
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

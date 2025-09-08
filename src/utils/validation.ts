// Các hàm tiện ích để validation form
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Validation rules cho từng trường
export const validationRules = {
  // Kiểm tra tên có hợp lệ không
  name: (value: string): string => {
    if (!value.trim()) {
      return "Họ và tên là bắt buộc";
    }
    if (value.trim().length < 2) {
      return "Họ và tên phải có ít nhất 2 ký tự";
    }
    if (value.trim().length > 50) {
      return "Họ và tên không được vượt quá 50 ký tự";
    }
    return "";
  },

  // Kiểm tra số điện thoại có hợp lệ không
  phone: (value: string): string => {
    if (!value.trim()) {
      return "Số điện thoại là bắt buộc";
    }
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(value.trim())) {
      return "Số điện thoại không hợp lệ";
    }
    return "";
  },

  // Kiểm tra email có hợp lệ không
  email: (value: string): string => {
    if (!value.trim()) {
      return "Email là bắt buộc";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) {
      return "Email không hợp lệ";
    }
    return "";
  },

  // Kiểm tra tiêu đề có hợp lệ không
  subject: (value: string): string => {
    if (!value.trim()) {
      return "Tiêu đề là bắt buộc";
    }
    if (value.trim().length < 5) {
      return "Tiêu đề phải có ít nhất 5 ký tự";
    }
    if (value.trim().length > 100) {
      return "Tiêu đề không được vượt quá 100 ký tự";
    }
    return "";
  },

  // Kiểm tra nội dung có hợp lệ không
  content: (value: string): string => {
    if (!value.trim()) {
      return "Nội dung là bắt buộc";
    }
    if (value.trim().length < 10) {
      return "Nội dung phải có ít nhất 10 ký tự";
    }
    if (value.trim().length > 1000) {
      return "Nội dung không được vượt quá 1000 ký tự";
    }
    return "";
  }
};

// Hàm validate toàn bộ form
export const validateFormContact = (data: {
  name: string;
  phone: string;
  email: string;
  subject: string;
  content: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate từng trường
  const nameError = validationRules.name(data.name);
  if (nameError) errors.name = nameError;

  const phoneError = validationRules.phone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const emailError = validationRules.email(data.email);
  if (emailError) errors.email = emailError;

  const subjectError = validationRules.subject(data.subject);
  if (subjectError) errors.subject = subjectError;

  const contentError = validationRules.content(data.content);
  if (contentError) errors.content = contentError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Hàm validate từng trường riêng lẻ (dùng cho real-time validation)
export const validateField = (field: keyof typeof validationRules, value: string): string => {
  return validationRules[field](value);
};

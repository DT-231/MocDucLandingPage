/**
 * Cấu hình cho Formidable Bridge API
 * Chứa các thông số kết nối và mapping field IDs
 */

// Cấu hình API endpoints
export const FORMIDABLE_API_CONFIG = {
  // URL của WordPress site (cần cập nhật theo domain thực tế)
  WORDPRESS_BASE_URL: process.env.VITE_WORDPRESS_URL || 'https://your-wordpress-domain.com',
  
  // Đường dẫn API
  API_BASE_PATH: '/wp-json/formidable-bridge/v1',
  
  // Timeout cho requests (milliseconds)
  REQUEST_TIMEOUT: 10000,
  
  // Retry attempts khi gặp lỗi network
  MAX_RETRY_ATTEMPTS: 3,
};

// Mapping các Form IDs - cập nhật theo forms thực tế trong Formidable
export const FORMIDABLE_FORMS = {
  CONTACT_FORM: {
    ID: 1, // Form ID trong Formidable
    NAME: 'Contact Form',
    FIELDS: {
      NAME: 123,        // Field ID cho họ tên
      EMAIL: 124,       // Field ID cho email
      PHONE: 125,       // Field ID cho số điện thoại
      MESSAGE: 126,     // Field ID cho tin nhắn
      COMPANY: 127,     // Field ID cho công ty (nếu có)
      SUBJECT: 128,     // Field ID cho chủ đề (nếu có)
    }
  },
  
  NEWSLETTER_FORM: {
    ID: 2,
    NAME: 'Newsletter Subscription',
    FIELDS: {
      EMAIL: 129,       // Field ID cho email
      NAME: 130,        // Field ID cho tên (tùy chọn)
      PREFERENCES: 131, // Field ID cho sở thích (checkbox)
    }
  },
  
  CONSULTATION_FORM: {
    ID: 3,
    NAME: 'Free Consultation Request',
    FIELDS: {
      NAME: 132,
      EMAIL: 133,
      PHONE: 134,
      COMPANY: 135,
      PROJECT_TYPE: 136,    // Select field
      BUDGET_RANGE: 137,    // Radio buttons
      TIMELINE: 138,        // Select field
      DESCRIPTION: 139,     // Textarea
    }
  }
} as const;

// Validation rules cho các field types
export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: 'Email không hợp lệ'
  },
  
  PHONE: {
    PATTERN: /^[0-9+\-\s()]{10,15}$/,
    MESSAGE: 'Số điện thoại không hợp lệ (10-15 số)'
  },
  
  REQUIRED: {
    MESSAGE: 'Trường này là bắt buộc'
  },
  
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-ZÀ-ỹ\s]+$/,
    MESSAGE: 'Tên chỉ được chứa chữ cái và khoảng trắng'
  },
  
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
    MESSAGE: 'Tin nhắn phải từ 10-1000 ký tự'
  }
} as const;

// Error messages tiếng Việt
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
  RATE_LIMIT_EXCEEDED: 'Bạn đã gửi quá nhiều form. Vui lòng thử lại sau 1 phút.',
  FORM_NOT_FOUND: 'Không tìm thấy form. Vui lòng liên hệ quản trị viên.',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
  SERVER_ERROR: 'Có lỗi xảy ra từ phía server. Vui lòng thử lại sau.',
  UNKNOWN_ERROR: 'Có lỗi không xác định xảy ra. Vui lòng thử lại.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Form đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.',
  NEWSLETTER_SUBSCRIBED: 'Cảm ơn bạn đã đăng ký newsletter! Kiểm tra email để xác nhận.',
  CONSULTATION_REQUESTED: 'Yêu cầu tư vấn đã được gửi. Chúng tôi sẽ liên hệ trong vòng 24h.',
} as const;

// Helper function để lấy full API URL
export const getFormidableAPIUrl = (endpoint: string = ''): string => {
  const baseUrl = FORMIDABLE_API_CONFIG.WORDPRESS_BASE_URL;
  const apiPath = FORMIDABLE_API_CONFIG.API_BASE_PATH;
  return `${baseUrl}${apiPath}${endpoint}`;
};

// Helper function để validate field theo type
export const validateField = (value: string, fieldType: keyof typeof VALIDATION_RULES): {
  isValid: boolean;
  message?: string;
} => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      message: VALIDATION_RULES.REQUIRED.MESSAGE
    };
  }

  switch (fieldType) {
    case 'EMAIL': {
      const emailRule = VALIDATION_RULES.EMAIL;
      return {
        isValid: emailRule.PATTERN.test(value),
        message: emailRule.PATTERN.test(value) ? undefined : emailRule.MESSAGE
      };
    }
      
    case 'PHONE': {
      const phoneRule = VALIDATION_RULES.PHONE;
      const cleanPhone = value.replace(/\s/g, '');
      return {
        isValid: phoneRule.PATTERN.test(cleanPhone),
        message: phoneRule.PATTERN.test(cleanPhone) ? undefined : phoneRule.MESSAGE
      };
    }
      
    case 'NAME': {
      const nameRule = VALIDATION_RULES.NAME;
      const isLengthValid = value.length >= nameRule.MIN_LENGTH && value.length <= nameRule.MAX_LENGTH;
      const isPatternValid = nameRule.PATTERN.test(value);
      return {
        isValid: isLengthValid && isPatternValid,
        message: isLengthValid && isPatternValid ? undefined : nameRule.MESSAGE
      };
    }
      
    case 'MESSAGE': {
      const messageRule = VALIDATION_RULES.MESSAGE;
      const isMessageLengthValid = value.length >= messageRule.MIN_LENGTH && value.length <= messageRule.MAX_LENGTH;
      return {
        isValid: isMessageLengthValid,
        message: isMessageLengthValid ? undefined : messageRule.MESSAGE
      };
    }
      
    case 'REQUIRED':
      return { isValid: true };
      
    default:
      return { isValid: true };
  }
};

// Type definitions cho type safety
export type FormidableFormType = keyof typeof FORMIDABLE_FORMS;
export type ValidationRuleType = keyof typeof VALIDATION_RULES;

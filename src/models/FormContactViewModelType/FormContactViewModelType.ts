// Interface định nghĩa props cho FormContactViewModel component
export interface FormContactViewModelProps {
  isContactPage?: boolean; // Xác định có phải đang ở trang contact không
  className?: string; // Custom CSS class (tùy chọn)
}

// Interface cho form data
export interface FormContactData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  content: string;
}

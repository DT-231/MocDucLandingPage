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

// Interface cho trạng thái form
export interface FormState {
  data: FormContactData;
  errors: Record<string, string>;
  isLoading: boolean;
  isSubmitted: boolean;
}

// Interface cho form field props
export interface FormFieldProps {
  name: keyof FormContactData;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

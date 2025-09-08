import { useState, useCallback } from "react";
import { validateFormContact, validateField } from "@/utils/validation";
import { postFormContact } from "@/Services/ContactService";
import type { FormContactData, FormState } from "@/models/FormContactViewModelType/FormContactViewModelType";

// Custom hook quản lý logic form liên hệ
export const useContactForm = () => {
  // State quản lý dữ liệu form
  const [formState, setFormState] = useState<FormState>({
    data: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      content: "",
    },
    errors: {},
    isLoading: false,
    isSubmitted: false,
  });

  // Hàm xử lý thay đổi input
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormContactData;

    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [fieldName]: value,
      },
      // Xóa error của field đang được sửa
      errors: {
        ...prev.errors,
        [fieldName]: "",
      },
    }));
  }, []);

  // Hàm validate field khi blur (mất focus)
  const handleFieldBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormContactData;
    
    const error = validateField(fieldName, value);
    
    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [fieldName]: error,
      },
    }));
  }, []);

  // Hàm reset form về trạng thái ban đầu
  const resetForm = useCallback(() => {
    setFormState({
      data: {
        name: "",
        phone: "",
        email: "",
        subject: "",
        content: "",
      },
      errors: {},
      isLoading: false,
      isSubmitted: false,
    });
  }, []);

  // Hàm xử lý submit form
  const handleSubmit = useCallback(async (
    e: React.FormEvent,
    onSuccess?: (message: string) => void,
    onError?: (message: string) => void
  ) => {
    e.preventDefault();
    
    // Validate toàn bộ form
    const validation = validateFormContact(formState.data);
    
    if (!validation.isValid) {
      setFormState(prev => ({
        ...prev,
        errors: validation.errors,
      }));
      return;
    }

    // Bắt đầu gửi form
    setFormState(prev => ({
      ...prev,
      isLoading: true,
      errors: {},
    }));

    try {
      // Gửi form lên server
      const response = await postFormContact(formState.data);
      
      if (response.success) {
        setFormState(prev => ({
          ...prev,
          isLoading: false,
          isSubmitted: true,
        }));
        
        // Callback thành công
        if (onSuccess) {
          onSuccess(response.message || "Gửi form thành công!");
        }
        
        // Reset form sau 2 giây
        setTimeout(() => {
          resetForm();
        }, 2000);
      } else {
        throw response;
      }
    } catch (error: any) {
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        errors: error.errors || {},
      }));
      
      // Callback lỗi
      if (onError) {
        onError(error.message || "Đã có lỗi xảy ra khi gửi form");
      }
    }
  }, [formState.data, resetForm]);

  return {
    formState,
    handleInputChange,
    handleFieldBlur,
    handleSubmit,
    resetForm,
  };
};

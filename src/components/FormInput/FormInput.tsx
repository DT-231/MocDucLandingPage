import React from "react";

interface FormInputProps {
  name: string;
  type?: "text" | "email" | "tel";
  placeholder: string;
  value: string;
  error?: string;
  required?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

interface FormTextAreaProps {
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

// Component Input với validation
export const FormInput: React.FC<FormInputProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  error,
  required = false,
  className = "",
  onChange,
  onBlur,
}) => {
  const baseClasses = `
    w-full px-3 sm:px-4 py-2 sm:py-3 border bg-[#f6f6f6] 
    rounded-2xl sm:rounded-4xl outline-none transition-all duration-300 
    placeholder-gray-500 text-sm sm:text-base
  `;

  const errorClasses = error 
    ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
    : "border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary";

  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={`${baseClasses} ${errorClasses} ${className}`}
      />
      {error && (
        <p className="text-red-500 text-xs sm:text-sm mt-1 ml-2">
          {error}
        </p>
      )}
    </div>
  );
};

// Component TextArea với validation
export const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  placeholder,
  value,
  error,
  required = false,
  rows = 4,
  className = "",
  onChange,
  onBlur,
}) => {
  const baseClasses = `
    w-full px-3 sm:px-4 py-2 sm:py-3 border bg-[#f6f6f6] 
    rounded-xl outline-none transition-all duration-300 
    placeholder-gray-500 resize-vertical text-sm sm:text-base
  `;

  const errorClasses = error 
    ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
    : "border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary";

  return (
    <div className="w-full">
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        rows={rows}
        className={`${baseClasses} ${errorClasses} ${className}`}
      />
      {error && (
        <p className="text-red-500 text-xs sm:text-sm mt-1 ml-2">
          {error}
        </p>
      )}
    </div>
  );
};

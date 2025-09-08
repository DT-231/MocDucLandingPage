import React from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface NotificationProps {
  type: "success" | "error" | "warning";
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

// Component hiển thị thông báo sau khi submit form
const FormNotification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  // Xác định icon và màu sắc theo loại thông báo
  const getNotificationStyle = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          borderColor: "border-green-200",
          icon: <CheckCircle className="w-5 h-5 text-green-400" />,
        };
      case "error":
        return {
          bgColor: "bg-red-50",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          icon: <XCircle className="w-5 h-5 text-red-400" />,
        };
      case "warning":
        return {
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
          icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
        };
      default:
        return {
          bgColor: "bg-gray-50",
          textColor: "text-gray-800",
          borderColor: "border-gray-200",
          icon: <AlertTriangle className="w-5 h-5 text-gray-400" />,
        };
    }
  };

  const style = getNotificationStyle();

  return (
    <div
      className={`
        ${style.bgColor} ${style.borderColor} ${style.textColor}
        border rounded-lg p-4 mb-4 animate-fade-in
        flex items-start space-x-3
      `}
    >
      <div className="flex-shrink-0">
        {style.icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Đóng thông báo"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default FormNotification;

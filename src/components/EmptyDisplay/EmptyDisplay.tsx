import React from 'react';
import Button from '@components/Button/Button';

interface EmptyDisplayProps {
  title?: string;
  message: string;
  buttonText?: string;
  onAction?: () => void;
  showRefreshButton?: boolean;
}

// Component hiển thị khi không có dữ liệu
const EmptyDisplay: React.FC<EmptyDisplayProps> = ({ 
  title = "Không có dữ liệu",
  message,
  buttonText = "Tải lại",
  onAction,
  showRefreshButton = true
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-[#FEFFFA]">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Empty icon */}
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        
        {/* Empty title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-3">
          {title}
        </h2>
        
        {/* Empty message */}
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          {message}
        </p>
        
        {/* Action button */}
        {onAction && (
          <Button
            onClick={onAction}
            classNames="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 mb-4"
          >
            {buttonText}
          </Button>
        )}
        
        {/* Refresh button */}
        {showRefreshButton && (
          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="text-primary hover:text-primary/80 underline text-xs sm:text-sm"
            >
              Tải lại trang
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyDisplay;

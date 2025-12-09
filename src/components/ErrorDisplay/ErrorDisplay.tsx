import React from 'react';
import Button from '@components/Button/Button';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

// Component hiển thị lỗi với tùy chọn thử lại
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className=" overflow-x-hidden flex items-center justify-center min-h-screen bg-[#FEFFFA]">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Error icon */}
        <div className="text-red-500 mb-4">
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        {/* Error message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Oops! Có lỗi xảy ra
        </h2>
        
        <p className="text-gray-600 mb-6 text-base sm:text-lg">
          {error}
        </p>
        
        {/* Retry button */}
        {onRetry && (
          <Button
            onClick={onRetry}
            classNames="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Thử lại
          </Button>
        )}
        
        {/* Alternative action */}
        <div className="mt-4">
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:text-primary/80 underline text-sm"
          >
            Tải lại trang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;

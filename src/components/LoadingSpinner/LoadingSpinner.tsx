import React from 'react';

// Component hiển thị trạng thái loading
const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-screen overflow-x-hidden flex items-center justify-center min-h-screen bg-[#FEFFFA]">
      <div className="text-center">
        {/* Spinner animation */}
        <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 border-4 border-gray-200 border-t-primary mx-auto"></div>
        
        {/* Loading text */}
        <p className="mt-4 text-base sm:text-lg md:text-xl text-third font-medium">
          Đang tải dữ liệu...
        </p>
        
        {/* Loading dots animation */}
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

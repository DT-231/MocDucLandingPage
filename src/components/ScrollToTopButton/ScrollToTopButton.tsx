import React from 'react';

interface ScrollToTopButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

// 📌 Component button scroll lên top - chỉ hiển thị UI
// - Nhận isVisible để điều khiển hiển thị
// - Nhận onClick callback từ parent (ViewModel)
const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ 
  isVisible, 
  onClick 
}) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 bg-primary hover:bg-primary/ cursor-pointer text-white 
                 w-12 h-12 rounded-full shadow-lg transition-all duration-300 
                 flex items-center justify-center group hover:scale-110"
      aria-label="Scroll to top"
    >
      {/* Icon mũi tên lên */}
      <svg
        className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;

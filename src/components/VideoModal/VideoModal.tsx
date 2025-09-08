import React, { useEffect, useRef } from 'react';

// Interface định nghĩa props cho VideoModal component
interface VideoModalProps {
  isOpen: boolean; // Trạng thái mở/đóng modal
  onClose: () => void; // Callback khi đóng modal
  videoUrl: string; // URL của video cần phát
  title?: string; // Tiêu đề modal (tùy chọn)
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title = "Video giới thiệu"
}) => {
  // Ref để focus vào modal khi mở
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Effect để xử lý focus và ESC key khi modal mở
  useEffect(() => {
    if (isOpen) {
      // Focus vào modal khi mở
      modalRef.current?.focus();
      
      // Ngăn scroll của body khi modal mở
      document.body.style.overflow = 'hidden';
      
      // Xử lý phím ESC để đóng modal
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
      
      return () => {
        document.removeEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'unset';
      };
    } else {
      // Khôi phục scroll của body khi modal đóng
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  // Nếu modal không mở thì không render gì
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Overlay backdrop */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Modal container */}
      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-4xl mx-4 bg-white rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header với nút đóng */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Đóng modal"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M18 6L6 18M6 6l12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        
        {/* Video container */}
        <div className="p-4">
          <div className="relative aspect-video w-full bg-gray-900 rounded-lg overflow-hidden">
            <video
              className="w-full h-full"
              controls
              autoPlay
              preload="metadata"
              aria-label={`${title} video`}
            >
              <source src={videoUrl} type="video/mp4" />
              <p className="text-white p-4">
                Trình duyệt của bạn không hỗ trợ phát video. 
                <a 
                  href={videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 underline ml-1"
                >
                  Tải video về để xem
                </a>
              </p>
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

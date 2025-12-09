import React from 'react';
import EmptyDisplay from './EmptyDisplay';

// Component hiển thị khi không có project nào
export const EmptyProjects: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  return (
    <EmptyDisplay
      title="Chưa có dự án nào"
      message="Hiện tại chưa có dự án nào được thêm vào. Vui lòng quay lại sau hoặc liên hệ với chúng tôi để biết thêm thông tin."
      buttonText="Tải lại dự án"
      onAction={onRetry}
      showRefreshButton={true}
    />
  );
};

// Component hiển thị khi không có blog nào
export const EmptyBlogs: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  return (
    <EmptyDisplay
      title="Chưa có bài viết nào"
      message="Hiện tại chưa có bài viết nào được đăng tải. Vui lòng quay lại sau để đọc những tin tức và chia sẻ mới nhất."
      buttonText="Tải lại bài viết"
      onAction={onRetry}
      showRefreshButton={true}
    />
  );
};

// Component hiển thị khi tìm kiếm không có kết quả
export const EmptySearchResult: React.FC<{ 
  searchTerm: string;
  onClearSearch?: () => void;
}> = ({ searchTerm, onClearSearch }) => {
  return (
    <EmptyDisplay
      title="Không tìm thấy kết quả"
      message={`Không tìm thấy kết quả nào cho "${searchTerm}". Hãy thử tìm kiếm với từ khóa khác.`}
      buttonText="Xóa tìm kiếm"
      onAction={onClearSearch}
      showRefreshButton={false}
    />
  );
};

// Component hiển thị khi danh sách rỗng với icon tùy chỉnh
export const EmptyList: React.FC<{
  title?: string;
  message: string;
  icon?: React.ReactNode;
  onAction?: () => void;
  buttonText?: string;
}> = ({ 
  title = "Danh sách trống",
  message,
  icon,
  onAction,
  buttonText = "Thử lại"
}) => {
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-[#FEFFFA]">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Custom icon hoặc default icon */}
        <div className="text-gray-400 mb-4">
          {icon || (
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          {title}
        </h3>
        
        {/* Message */}
        <p className="text-gray-500 mb-4 text-sm sm:text-base">
          {message}
        </p>
        
        {/* Action button */}
        {onAction && (
          <button
            onClick={onAction}
            className="text-primary hover:text-primary/80 font-medium text-sm underline"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyDisplay;

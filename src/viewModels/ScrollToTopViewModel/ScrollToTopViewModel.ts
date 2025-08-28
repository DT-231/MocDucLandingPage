import { useState, useEffect } from 'react';
import type { ScrollToTopViewModelType } from '@/models/ScrollToTopViewModelType/ScrollToTopViewModelType';

// 📌 ViewModel quản lý logic hiển thị button scroll to top
// - Theo dõi vị trí scroll để quyết định hiện/ẩn button
// - Cung cấp method scroll lên top
export const useScrollToTopViewModel = (): ScrollToTopViewModelType => {
  // State quản lý việc hiển thị button
  const [isVisible, setIsVisible] = useState(false);

  // Method scroll lên đầu trang với animation mượt
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  // Method xử lý sự kiện scroll để quyết định hiện/ẩn button
  const handleScroll = (): void => {
    const currentScrollY = window.scrollY;
    
    // Hiện button khi scroll xuống hơn 300px
    if (currentScrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Effect để thêm/bỏ event listener scroll
  useEffect(() => {
    // Thêm event listener khi component mount
    window.addEventListener('scroll', handleScroll);

    // Cleanup: Bỏ event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    isVisible,
    scrollToTop,
    handleScroll,
  };
};

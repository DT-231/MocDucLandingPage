// 📌 Type định nghĩa cho ScrollToTopViewModel
export interface ScrollToTopViewModelType {
  // State quản lý việc hiển thị button
  isVisible: boolean;
  
  // Method để scroll lên top
  scrollToTop: () => void;
  
  // Method để toggle visibility dựa trên scroll position
  handleScroll: () => void;
}

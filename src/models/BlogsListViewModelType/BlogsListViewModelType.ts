// Interface định nghĩa props cho NewsListViewModelProps component
export interface BlogsListViewModelProps {
  limit?: number; // Giới hạn số lượng bài viết hiển thị (tùy chọn)
  showReadMore?: boolean; // Hiển thị nút "Đọc thêm" (tùy chọn)
  className?: string; // Custom CSS class (tùy chọn)
}

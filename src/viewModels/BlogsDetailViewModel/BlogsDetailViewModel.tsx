import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogService } from "@/Services/BlogService";
import type { BlogItem } from "@/models/WordPressBlogType/WordPressBlogType";
import type {
  CategoryItem,
  ArchiveItem,
} from "@/models/BlogsDetailType/BlogsDetailType";

/**
 * ViewModel quản lý logic cho trang BlogsDetail
 * Theo kiến trúc MVVM - ViewModel không chứa UI
 */
export const useBlogsDetailViewModel = (identifier?: string) => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogItem[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch chi tiết blog từ API - có thể dùng slug hoặc id
  const fetchBlogDetail = async (blogIdentifier: string) => {
    try {
      setIsLoading(true);
      setError(null);

      let blogData: BlogItem;
      
      // Kiểm tra nếu identifier là số (id) hay string (slug)
      if (/^\d+$/.test(blogIdentifier)) {
        // Nếu là số, sử dụng getBlogById
        blogData = await BlogService.getBlogById(parseInt(blogIdentifier));
      } else {
        // Nếu là string, sử dụng getBlogBySlug
        blogData = await BlogService.getBlogBySlug(blogIdentifier);
      }
      console.log(blogData);
      
      setBlog(blogData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tải bài viết';
      setError(errorMessage);
      console.error('Lỗi khi tải chi tiết blog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch blogs liên quan (5 bài mới nhất, loại trừ bài hiện tại)
  const fetchRelatedBlogs = async (currentBlogId?: number) => {
    try {
      const response = await BlogService.getAllBlogs({
        per_page: 4,
        orderby: 'date',
        order: 'desc'
      });

      // Lọc bỏ bài viết hiện tại và chỉ lấy 3 bài
      const filtered = response.data
        .filter(b => b.id !== currentBlogId)
        .slice(0, 3);

      setRelatedBlogs(filtered);
    } catch (err) {
      console.error('Lỗi khi tải bài viết liên quan:', err);
      setRelatedBlogs([]);
    }
  };

  // Fetch bài viết gần đây cho sidebar
  const fetchRecentBlogs = async (currentBlogId?: number) => {
    try {
      const response = await BlogService.getAllBlogs({
        per_page: 4,
        orderby: 'date',
        order: 'desc'
      });

      // Lọc bỏ bài viết hiện tại và chỉ lấy 3 bài
      const filtered = response.data
        .filter(b => b.id !== currentBlogId)
        .slice(0, 3);

      setRecentBlogs(filtered);
    } catch (err) {
      console.error('Lỗi khi tải bài viết gần đây:', err);
      setRecentBlogs([]);
    }
  };

  // Effect để tải dữ liệu khi identifier thay đổi
  useEffect(() => {
    if (identifier) {
      fetchBlogDetail(identifier);
    }
  }, [identifier]);

  // Effect để tải dữ liệu liên quan khi có blog chính
  useEffect(() => {
    if (blog) {
      fetchRelatedBlogs(blog.id);
      fetchRecentBlogs(blog.id);
    }
  }, [blog]);

  // Danh sách các thể loại (dummy data - có thể mở rộng để lấy từ API)
  const categories: CategoryItem[] = [
    { name: "Thiết kế nội thất", count: 15 },
    { name: "Phong cách hiện đại", count: 10 },
    { name: "Trang trí nhà", count: 8 },
    { name: "Mẹo hay", count: 12 },
  ];

  // Danh sách tags (dadummy ta - có thể mở rộng để lấy từ API)
  const tags = [
    "thiết kế",
    "nội thất",
    "hiện đại",
    "phòng khách",
    "nhà bếp",
    "phòng ngủ",
    "trang trí",
    "màu sắc",
    "ánh sáng",
    "không gian"
  ];

  // Danh sách archive theo tháng (dummy data - có thể mở rộng để lấy từ API)
  const archives: ArchiveItem[] = [
    { name: "Tháng 9 2025", count: 5 },
    { name: "Tháng 8 2025", count: 8 },
    { name: "Tháng 7 2025", count: 6 },
    { name: "Tháng 6 2025", count: 10 },
  ];

  // Effect để xử lý scroll và back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Xử lý điều hướng
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Xử lý chia sẻ Facebook
  const handleShareFacebook = () => {
    if (blog) {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(blog.title);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`,
        "_blank",
        "width=600,height=400"
      );
    }
  };

  // Xử lý chia sẻ Twitter
  const handleShareTwitter = () => {
    if (blog) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(blog.title);
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        "_blank",
        "width=600,height=400"
      );
    }
  };

  // Xử lý copy link
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // Có thể thêm toast notification ở đây
      alert('Đã copy link bài viết!');
    } catch (err) {
      console.error('Không thể copy link:', err);
      alert('Không thể copy link. Vui lòng thử lại.');
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchTerm.trim()) {
      try {
        // Chuyển hướng đến trang kết quả tìm kiếm
        navigate(`/blogs?search=${encodeURIComponent(searchTerm.trim())}`);
      } catch (err) {
        console.error('Lỗi khi tìm kiếm:', err);
        alert('Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.');
      }
    }
  };

  // Xử lý thay đổi search term
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  return {
    // Data
    blog,
    relatedBlogs,
    recentBlogs,
    categories,
    tags,
    archives,
    showBackToTop,
    isLoading,
    searchTerm,
    error,

    // Handlers
    handleNavigate,
    handleShareFacebook,
    handleShareTwitter,
    handleCopyToClipboard,
    handleSearch,
    handleSearchTermChange,
    scrollToTop,

    // Actions
    refetch: () => identifier && fetchBlogDetail(identifier),
  };
};

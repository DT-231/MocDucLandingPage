import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleBlogs } from "@/data/newsData";
import type { CategoryItem, ArchiveItem } from "@/models/BlogsDetailType/BlogsDetailType";

/**
 * ViewModel quản lý logic cho trang BlogsDetail
 * Theo kiến trúc MVVM - ViewModel không chứa UI
 */
export const useBlogsDetailViewModel = (slug?: string) => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Tìm bài blog theo slug
  const blog = sampleBlogs.find((b) => b.slug === slug);

  // Lấy bài blog liên quan cùng category
  const relatedBlogs = sampleBlogs
    .filter((b) => b.id !== blog?.id && b.category === blog?.category)
    .slice(0, 3);

  // Lấy các bài blog gần đây khác
  const recentBlogs = sampleBlogs.filter((b) => b.id !== blog?.id).slice(0, 3);

  // Danh sách các thể loại
  const categories: CategoryItem[] = [
    { name: "ALL", count: 10 },
    { name: "marketing", count: 5 },
    { name: "interior", count: 10 },
    { name: "Uncategorized", count: 3 },
  ];

  // Danh sách tags
  const tags = [
    "Design",
    "Interior design",
    "Architecture",
    "Interior",
    "Commercial",
    "Home interiors",
  ];

  // Danh sách archive theo tháng
  const archives: ArchiveItem[] = [
    { name: "July 2019", count: 25 },
    { name: "August 2011", count: 51 },
    { name: "September 2012", count: 18 },
    { name: "October 2013", count: 6 },
  ];

  // Xử lý loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Xử lý scroll và back to top
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
    const url = encodeURIComponent(window.location.href);
    console.log(url);
    
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  // Xử lý chia sẻ Twitter
  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog?.title || "");
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank"
    );
  };

  // Xử lý copy link
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // Có thể thêm toast notification ở đây
  };

  // Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic tìm kiếm có thể được implement ở đây
    console.log("Tìm kiếm:", searchTerm);
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
    
    // Handlers
    handleNavigate,
    handleShareFacebook,
    handleShareTwitter,
    handleCopyToClipboard,
    handleSearch,
    handleSearchTermChange,
    scrollToTop,
  };
};

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogService } from "@/Services/BlogService";
import type { BlogsListViewModelProps } from "@/models/BlogsListViewModelType/BlogsListViewModelType";
import type { BlogItem } from "@/models/WordPressBlogType/WordPressBlogType";
import type { Blogs } from "@/models/NewsType/NewsType";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import { BlogsItem } from "@/components/News";

const BlogsListViewModel: React.FC<BlogsListViewModelProps> = ({
  limit,
  showReadMore = true,
  className = "",
}) => {
  // State để quản lý dữ liệu blogs từ API
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMoreBlogs, setHasMoreBlogs] = useState<boolean>(false);

  // Số bài viết mỗi lần tải
  const perPage = limit || 6;

  // Function để convert BlogItem từ WordPress API thành Blogs interface
  const convertBlogItemToBlogs = (blogItem: BlogItem): Blogs => {
    // Convert date sang format "22 THÁNG 9"
    const formatDateForBlogsItem = (dateString: string): string => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      return `${day} THÁNG ${month}`;
    };

    return {
      id: blogItem.id.toString(),
      title: blogItem.title,
      description: blogItem.description,
      image: blogItem.featuredImage || "/placeholder-image.svg",
      date: formatDateForBlogsItem(blogItem.date), // Convert date format
      readTime: blogItem.readTime,
      slug: blogItem.slug,
    };
  };

  // Fetch dữ liệu blogs từ API
  const fetchBlogs = async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await BlogService.getAllBlogs({
        page,
        per_page: perPage,
        orderby: "date",
        order: "desc",
      });

      if (append) {
        // Thêm vào danh sách hiện tại (cho chức năng "Load more")
        setBlogs((prev) => [...prev, ...response.data]);
      } else {
        // Thay thế danh sách hiện tại
        setBlogs(response.data);
      }

      setHasMoreBlogs(response.hasMore);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi tải dữ liệu";
      setError(errorMessage);
      console.error("Lỗi khi fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Effect để tải dữ liệu khi component mount
  useEffect(() => {
    fetchBlogs(1, false);
  }, [perPage]);

  // Xử lý khi người dùng muốn xem thêm bài viết
  const handleLoadMore = () => {
    if (!loading && hasMoreBlogs) {
      fetchBlogs(currentPage + 1, true);
    }
  };

  // Hiển thị loading state
  if (loading && blogs.length === 0) {
    return (
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${className}`}
      >
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Hiển thị error state
  if (error && blogs.length === 0) {
    return (
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${className}`}
      >
        <ErrorDisplay error={error} onRetry={() => fetchBlogs(1, false)} />
      </div>
    );
  }

  // Không có dữ liệu
  if (blogs.length === 0) {
    return (
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${className}`}
      >
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">
            Chưa có bài viết nào
          </h3>
          <p className="text-gray-500">
            Hãy quay lại sau để xem những bài viết mới nhất.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 font-primary ${className}`}
    >
      {/* Phần header với tiêu đề */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#8B7355] mb-4 tracking-wide">
          TIN TỨC MỚI NHẤT
        </h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          CÙNG TÌM HIỂU VỀ CÁC XU HƯỚNG THIẾT KẾ MỚI NHẤT VÀ CÁC MẸO HAY HỮU ÍCH
          <br />
          ĐỂ TẠO RA NHỮNG KHÔNG GIAN SỐNG ĐẸP, HIỆN ĐẠI
        </p>
      </div>

      {/* Layout chính - bài viết lớn bên trái và danh sách bên phải */}
      <div className="grid grid-cols-1 lg:grid-cols-[760px_1fr] gap-12 max-w-[1400px] mx-auto">
        {/* Bài viết chính (bên trái) - max 760px */}
        {blogs.length > 0 && (
          <div className="w-full max-w-[760px]">
            <article className="bg-white">
              {/* Hình ảnh chính */}
              <Link
                to={`/blogs/${blogs[0].id}/${blogs[0].slug  }`}
                className="block group"
              >
                <div className="relative overflow-hidden aspect-[3.5/3] mb-8">
                  <img
                    src={blogs[0].featuredImage || "/placeholder-image.svg"}
                    alt={blogs[0].featuredImageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-image.svg";
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Date badge nằm đè trên góc trái */}
                  <div className="absolute top-0 left-0 bg-white/90  px-3 py-2 shadow-lg">
                    <time
                      dateTime={blogs[0].date}
                      className="text-2xl font-extrabold text-primary block "
                    >
                      {(() => {
                        const date = new Date(blogs[0].date);
                        const day = date.getDate();
                        const month = date.getMonth() + 1;
                        return (
                          <>
                            <span className="block text-2xl  leading-none">
                              {day}
                            </span>
                            <span className="block text-2xl uppercase tracking-wide">
                              THÁNG {month}
                            </span>
                          </>
                        );
                      })()}
                    </time>
                  </div>
                </div>
              </Link>

              {/* Nội dung bài viết chính */}
              <div className="space-y-6">
                {/* Tiêu đề */}
                <Link
                  to={`/blogs/${blogs[0].id}/${blogs[0].slug}`}
                  className="block group"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-primary leading-tight mb-4 transition-colors duration-200">
                    {blogs[0].title}
                  </h3>
                </Link>

                {/* Mô tả */}
                <p className="text-gray-600 leading-relaxed text-lg">
                  {blogs[0].description}
                </p>

                {/* Nút đọc tiếp */}
                {showReadMore && (
                  <Link
                    to={`/blogs/${blogs[0].id}/${blogs[0].slug}`}
                    className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#6B5A47] font-medium transition-colors duration-200 group"
                  >
                    <span>Đọc tiếp</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </article>
          </div>
        )}

        {/* Danh sách bài viết nhỏ (bên phải) - max 600px */}
        {blogs.length > 1 && (
          <div className="w-full max-w-[600px]">
            <div className="space-y-8">
              {blogs.slice(1, 6).map((blog: BlogItem) => (
                <BlogsItem
                  line={false}
                  key={blog.id}
                  blogs={convertBlogItemToBlogs(blog)}
                  showReadMore={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nút "Xem thêm" */}
      {showReadMore && hasMoreBlogs && (
        <div className="text-center mt-16">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="inline-flex items-center justify-center px-8 py-3 bg-[#8B7355] text-white font-medium rounded-lg hover:bg-[#6B5A47] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang tải...
              </>
            ) : (
              "Xem thêm bài viết"
            )}
          </button>
        </div>
      )}

      {/* Error state cho việc load thêm */}
      {error && blogs.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchBlogs(currentPage + 1, true)}
            className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
          >
            Thử lại
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogsListViewModel;

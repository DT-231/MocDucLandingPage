import React, { useState, useEffect } from "react";
import { BlogService } from "@/Services/BlogService";
import type { BlogItem } from "@/models/WordPressBlogType/WordPressBlogType";
import type { Blogs } from "@/models/NewsType/NewsType";
import BlogsItem from "@/components/BlogsItem/BlogsItem";

interface BlogViewModelProps {
  limit?: number;
  className?: string;
}

/**
 * Chuyển đổi BlogItem (từ WordPress API) sang Blogs (format cho component BlogsItem)
 */
const transformBlogItemToBlogs = (blogItem: BlogItem): Blogs => {
  // Format date: "2024-09-22T10:00:00" -> "22 THÁNG 9"
  const dateObj = new Date(blogItem.date);
  const day = dateObj.getDate();
  const months = [
    "THÁNG 1", "THÁNG 2", "THÁNG 3", "THÁNG 4",
    "THÁNG 5", "THÁNG 6", "THÁNG 7", "THÁNG 8",
    "THÁNG 9", "THÁNG 10", "THÁNG 11", "THÁNG 12",
  ];
  const formattedDate = `${day} ${months[dateObj.getMonth()]}`;

  return {
    id: String(blogItem.id),
    title: blogItem.title,
    description: blogItem.description,
    image: blogItem.featuredImage,
    date: formattedDate,
    readTime: blogItem.readTime,
    slug: blogItem.slug,
  };
};

const BlogViewModel: React.FC<BlogViewModelProps> = ({
  limit = 3,
  className = "",
}) => {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const blogItems = await BlogService.getLatestBlogs(limit);
        const transformed = blogItems.map(transformBlogItemToBlogs);
        setBlogs(transformed);
      } catch (err) {
        console.error("Lỗi khi tải tin tức:", err);
        setError("Không thể tải tin tức. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [limit]);

  return (
    <section className={`py-16 bg-gray-50 font-primary ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            TIN TỨC MỚI NHẤT
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12 text-gray-500">
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && blogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Chưa có bài viết nào.</p>
          </div>
        )}

        {/* News List */}
        {!isLoading && !error && blogs.length > 0 && (
          <div className="space-y-6">
            {blogs.map((news) => (
              <BlogsItem key={news.id} blogs={news} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogViewModel;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogService } from '@/Services/BlogService';
import type { BlogItem } from '@/models/WordPressBlogType/WordPressBlogType';

interface HomePageBlogsProps {
  limit?: number;
  className?: string;
}

const HomePageBlogs: React.FC<HomePageBlogsProps> = ({
  limit = 3,
  className = ''
}) => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const latestBlogs = await BlogService.getLatestBlogs(limit);
        setBlogs(latestBlogs);
      } catch (err) {
        console.error('Lỗi khi tải blogs cho trang chủ:', err);
        setError('Không thể tải tin tức');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, [limit]);

  if (loading) {
    return (
      <div className={`py-16 ${className}`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#8B7355] mb-4">
              TIN TỨC MỚI NHẤT
            </h2>
          </div>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || blogs.length === 0) {
    return null; // Không hiển thị section này nếu có lỗi hoặc không có data
  }

  return (
    <div className={`py-16 bg-gray-50 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8B7355] mb-4 tracking-wide">
            TIN TỨC MỚI NHẤT
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cập nhật những xu hướng thiết kế mới nhất và các mẹo hay để tạo ra không gian sống đẹp
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
              {/* Featured Image */}
              <Link to={`/blogs/${blog.slug || blog.id}`} className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={blog.featuredImage || '/placeholder-image.svg'}
                    alt={blog.featuredImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.svg';
                    }}
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Metadata */}
                {/* <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <time dateTime={blog.date}>
                    {new Date(blog.date).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </time>
                  {blog.readTime && (
                    <>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </>
                  )}
                </div> */}

                {/* Title */}
                <h3 className="font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
                  <Link 
                    to={`/blogs/${blog.slug || blog.id}`}
                    className="hover:text-[#8B7355] transition-colors duration-200"
                  >
                    {blog.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {blog.description}
                </p>

                {/* XEM THÊM Button */}
                <Link
                  to={`/blogs/${blog.slug || blog.id}`}
                  className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#6B5A47] font-medium text-sm transition-colors duration-200 group"
                >
                  <span>Đọc tiếp</span>
                  <svg 
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/blogs"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#8B7355] text-white font-medium rounded-lg hover:bg-[#6B5A47] transition-colors duration-200"
          >
            Xem tất cả tin tức
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageBlogs;

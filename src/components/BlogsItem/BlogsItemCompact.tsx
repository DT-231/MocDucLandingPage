import React from 'react';
import { Link } from 'react-router-dom';
import type { Blogs } from '@/models/NewsType/NewsType';

interface BlogsItemCompactProps {
  blogs: Blogs;
  showReadMore?: boolean;
  className?: string;
}

/**
 * Component hiển thị bài viết ở dạng compact cho sidebar
 * Tối ưu cho việc hiển thị nhiều bài viết trong không gian nhỏ
 */
const BlogsItemCompact: React.FC<BlogsItemCompactProps> = ({ 
  blogs, 
  showReadMore = false, 
  className = "" 
}) => {
  // Hàm format ngày theo định dạng "22 THÁNG 9" 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const month = date.getMonth() + 1;
    return { day, month };
  };

  const { day, month } = formatDate(blogs.date);

  return (
    <article className={`group ${className}`}>
      <Link to={`/blogs/${blogs.slug || blogs.id}`} className="flex gap-4">
        {/* Hình ảnh nhỏ với date badge */}
        <div className="flex-shrink-0 w-30 h-30 overflow-hidden relative">
          <img 
            src={blogs.image} 
            alt={blogs.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.svg';
            }}
          />
          
          {/* Date badge đè lên góc trái */}
          <div className="absolute top-0 left-0 bg-white/95 px-2 py-1 shadow-sm">
            <time dateTime={blogs.date} className="text-center block">
              <span className="block text-sm font-bold text-primary leading-none">{day}</span>
              <span className="block text-sm text-primary uppercase tracking-wide font-medium">Tháng{month}</span>
            </time>
          </div>
        </div>

        {/* Nội dung */}
        <div className="flex-1 space-y-2">
          <h4 className="font-extrabold text-primary leading-tight text-3xl group-hover:text-[#8B7355] transition-colors duration-200 line-clamp-2">
            {blogs.title}
          </h4>
       
          {showReadMore && (
            <Link 
              to={`/blogs/${blogs.slug || blogs.id}`}
              className="inline-flex items-center gap-1 text-xs text-[#8B7355] hover:text-[#6B5A47] font-medium transition-colors duration-200"
            >
              <span>Đọc tiếp</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </Link>
    </article>
  );
};

export default BlogsItemCompact;

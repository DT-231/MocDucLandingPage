

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { sampleBlogs } from '@/data/newsData';
import type { BlogsListViewModelProps } from '@/models/BlogsListViewModelType/BlogsListViewModelType';

const BlogsListViewModel: React.FC<BlogsListViewModelProps> = ({
  limit,
  showReadMore = true,
  className = ''
}) => {
  // State để quản lý số lượng bài viết hiển thị khi có chức năng "Load more"
  const [visibleCount, setVisibleCount] = useState<number>(limit || 6);

  // Giới hạn số lượng blogs hiển thị
  const displayedBlogs = useMemo(() => {
    return sampleBlogs.slice(0, visibleCount);
  }, [visibleCount]);

  // Xử lý khi người dùng muốn xem thêm bài viết
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + (limit || 6));
  };

  // Kiểm tra còn bài viết để load thêm không
  const hasMoreBlogs = displayedBlogs.length < sampleBlogs.length;

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-primary ${className}`}>
      {/* Phần header với tiêu đề */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#8B7355] mb-4 tracking-wide">
          TIN TỨC MỚI NHẤT
        </h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          CÙNG TÌM HIỂU VỀ CÁC XU HƯỚNG THIẾT KẾ MỚI NHẤT VÀ CÁC MẸO HAY HỮU ÍCH<br />
          ĐỂ TẠO RA NHỮNG KHÔNG GIAN SỐNG ĐẸPNH TI, HIỆN ĐẠI
        </p>
      </div>

      {/* Layout chính - bài viết lớn bên trái và danh sách bên phải */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Bài viết chính (bên trái) */}
        {displayedBlogs.length > 0 && (
          <div className="lg:col-span-2">
            <article className="bg-white">
              {/* Hình ảnh chính */}
              <Link to={`/blogs/${displayedBlogs[0].slug || displayedBlogs[0].id}`} className="block group">
                <div className="relative overflow-hidden aspect-[4/3] mb-8">
                  <img 
                    src={displayedBlogs[0].image} 
                    alt={displayedBlogs[0].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Date overlay */}
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 text-center min-w-[80px]">
                      <div className="text-2xl font-bold text-[#8B7355]">
                        {displayedBlogs[0].date.split(' ')[0]}
                      </div>
                      <div className="text-xs text-gray-600 uppercase">
                        {displayedBlogs[0].date.split(' ').slice(1).join(' ')}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Nội dung bài viết chính */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide leading-tight">
                  <Link 
                    to={`/blogs/${displayedBlogs[0].slug || displayedBlogs[0].id}`}
                    className="hover:text-[#8B7355] transition-colors duration-200"
                  >
                    {displayedBlogs[0].title}
                  </Link>
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {displayedBlogs[0].description}
                </p>

                {showReadMore && (
                  <Link 
                    to={`/blogs/${displayedBlogs[0].slug || displayedBlogs[0].id}`}
                    className="inline-flex items-center text-[#8B7355] hover:text-[#6B5A42] font-medium transition-colors duration-200 group text-sm uppercase tracking-wider"
                  >
                    Read More
                    <svg 
                      className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path 
                        d="M9 18L15 12L9 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </article>
          </div>
        )}

        {/* Danh sách bài viết nhỏ (bên phải) */}
        <div className="space-y-6">
          {displayedBlogs.slice(1, 6).map((blogs) => (
            <article key={blogs.id} className="flex gap-4 group">
              {/* Hình ảnh nhỏ */}
              <Link to={`/blogs/${blogs.slug || blogs.id}`} className="flex-shrink-0">
                <div className="w-20 h-20 overflow-hidden">
                  <img 
                    src={blogs.image} 
                    alt={blogs.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Link>

              {/* Nội dung */}
              <div className="flex-1 space-y-2">
                <h4 className="text-sm font-bold text-gray-900 uppercase leading-tight">
                  <Link 
                    to={`/blogs/${blogs.slug || blogs.id}`}
                    className="hover:text-[#8B7355] transition-colors duration-200 line-clamp-2"
                  >
                    {blogs.title}
                  </Link>
                </h4>
                
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {blogs.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 uppercase">
                  <span>{blogs.date}</span>
                  {blogs.readTime && (
                    <>
                      <span>•</span>
                      <span>{blogs.readTime}</span>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Nút Load More */}
      {hasMoreBlogs && (
        <div className="text-center mt-16">
          <button 
            className="bg-[#8B7355] hover:bg-[#6B5A42] text-white px-8 py-3 uppercase text-sm font-medium tracking-wider transition-colors duration-200"
            onClick={handleLoadMore}
          >
            Xem thêm bài viết
          </button>
        </div>
      )}

      {/* Thông báo khi không có bài viết nào */}
      {displayedBlogs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">Không có bài viết nào trong danh mục này.</p>
        </div>
      )}
    </div>
  );
};

export default BlogsListViewModel;
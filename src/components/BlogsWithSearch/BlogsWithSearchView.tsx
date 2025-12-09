import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BlogService } from '@/Services/BlogService';
import type { BlogItem } from '@/models/WordPressBlogType/WordPressBlogType';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay/ErrorDisplay';
import { EmptySearchResult, EmptyBlogs } from '@/components/EmptyDisplay';
import { Link } from 'react-router-dom';

const BlogsWithSearchView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') || '1'));
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  const perPage = 9; // 9 bài viết mỗi trang để hiển thị grid 3x3

  // Fetch dữ liệu
  const fetchBlogs = async (page: number = 1, search: string = '') => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (search.trim()) {
        response = await BlogService.searchBlogs(search.trim(), page, perPage);
      } else {
        response = await BlogService.getAllBlogs({
          page,
          per_page: perPage,
          orderby: 'date',
          order: 'desc'
        });
      }

      setBlogs(response.data);
      setTotalPages(response.totalPages);
      setTotalResults(response.total);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu';
      setError(errorMessage);
      console.error('Lỗi khi fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Effect để tải dữ liệu khi URL params thay đổi
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    
    setSearchTerm(search);
    fetchBlogs(page, search);
  }, [searchParams]);

  // Xử lý submit search form
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (searchTerm.trim()) {
      newParams.set('search', searchTerm.trim());
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  // Xử lý clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  // Xử lý pagination
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  // Tạo array số trang để hiển thị pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-primary">
      {/* Search Form */}
      <div className="mb-12">
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#6B5A47] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang tìm...' : 'Tìm kiếm'}
            </button>
            {searchParams.get('search') && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Xóa
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results Header */}
      {(searchParams.get('search') || totalResults > 0) && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              {searchParams.get('search') ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Kết quả tìm kiếm cho "{searchParams.get('search')}"
                  </h2>
                  <p className="text-gray-600">
                    Tìm thấy {totalResults} bài viết
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold text-[#8B7355] mb-2">
                    TẤT CẢ BÀI VIẾT
                  </h2>
                  <p className="text-gray-600">
                    {totalResults} bài viết
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {error && (
        <ErrorDisplay 
          error={error}
          onRetry={() => fetchBlogs(currentPage, searchParams.get('search') || '')}
        />
      )}

      {/* No Search Results */}
      {!loading && !error && blogs.length === 0 && searchParams.get('search') && (
        <EmptySearchResult
          searchTerm={searchParams.get('search') || ''}
          onClearSearch={handleClearSearch}
        />
      )}

      {/* No Blogs at all */}
      {!loading && !error && blogs.length === 0 && !searchParams.get('search') && (
        <EmptyBlogs onRetry={() => fetchBlogs(1, '')} />
      )}

      {/* Blogs Grid */}
      {!loading && !error && blogs.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                {/* Featured Image */}
                <Link to={`/blogs/${blog.slug || blog.id}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={blog.featuredImage || '/placeholder-image.svg'}
                      alt={blog.featuredImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-image.svg';
                      }}
                    />
                    
                    {/* Date Overlay */}
                    {/* <div className="absolute top-4 right-4 bg-white bg-opacity-95 px-3 py-2 rounded-sm shadow-sm">
                      <div className="text-xs text-gray-600 leading-tight">
                        {new Date(blog.date).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </div>
                    </div> */}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  {/* Read Time - chỉ hiển thị read time, bỏ date vì đã có trên ảnh */}
                  {
                //   blog.readTime && (
                //     <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                //       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                //       </svg>
                //       <span>{blog.readTime}</span>
                //     </div>
                //   )
                  }

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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    pageNum === currentPage
                      ? 'bg-[#8B7355] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogsWithSearchView;

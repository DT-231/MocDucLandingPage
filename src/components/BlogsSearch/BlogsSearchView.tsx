import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BlogService } from '@/Services/BlogService';
import type { BlogItem } from '@/models/WordPressBlogType/WordPressBlogType';
import type { BlogsListViewModelProps } from '@/models/BlogsListViewModelType/BlogsListViewModelType';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay/ErrorDisplay';

interface BlogsSearchViewProps extends BlogsListViewModelProps {
  initialSearchTerm?: string;
}

const BlogsSearchView: React.FC<BlogsSearchViewProps> = ({
  limit,
  className = '',
  initialSearchTerm = ''
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm || searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMoreBlogs, setHasMoreBlogs] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);

  const perPage = limit || 12;

  // Fetch dữ liệu search từ API
  const performSearch = async (query: string, page: number = 1, append: boolean = false) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await BlogService.searchBlogs(query.trim(), page, perPage);

      if (append) {
        setBlogs(prev => [...prev, ...response.data]);
      } else {
        setBlogs(response.data);
      }

      setHasMoreBlogs(response.hasMore);
      setCurrentPage(page);
      setTotalResults(response.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tìm kiếm';
      setError(errorMessage);
      console.error('Lỗi khi tìm kiếm blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Effect để thực hiện search khi component mount hoặc search params thay đổi
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
      performSearch(searchQuery, 1, false);
    }
  }, [searchParams]);

  // Xử lý submit search form
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Cập nhật URL params
      setSearchParams({ search: searchTerm.trim() });
      performSearch(searchTerm.trim(), 1, false);
    }
  };

  // Xử lý load more
  const handleLoadMore = () => {
    if (!loading && hasMoreBlogs && searchTerm.trim()) {
      performSearch(searchTerm.trim(), currentPage + 1, true);
    }
  };

  // Xử lý clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setBlogs([]);
    setTotalResults(0);
    setSearchParams({});
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-primary ${className}`}>
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
              disabled={loading || !searchTerm.trim()}
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

      {/* Search Results Header */}
      {searchParams.get('search') && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Kết quả tìm kiếm cho "{searchParams.get('search')}"
          </h2>
          <p className="text-gray-600">
            Tìm thấy {totalResults} bài viết
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && blogs.length === 0 && (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {error && blogs.length === 0 && (
        <ErrorDisplay 
          error={error}
          onRetry={() => searchParams.get('search') && performSearch(searchParams.get('search')!, 1, false)}
        />
      )}

      {/* No Results */}
      {!loading && blogs.length === 0 && searchParams.get('search') && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Không tìm thấy kết quả
          </h3>
          <p className="text-gray-500 mb-6">
            Không có bài viết nào khớp với từ khóa "{searchParams.get('search')}"
          </p>
          <button
            onClick={handleClearSearch}
            className="px-6 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6B5A47] transition-colors duration-200"
          >
            Xóa tìm kiếm
          </button>
        </div>
      )}

      {/* Search Results Grid */}
      {blogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Featured Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={blog.featuredImage || '/placeholder-image.svg'}
                  alt={blog.featuredImageAlt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.svg';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 leading-tight mb-3 line-clamp-2 hover:text-[#8B7355] transition-colors duration-200">
                  <a href={`/blogs/${blog.slug || blog.id}`}>
                    {blog.title}
                  </a>
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {blog.description}
                </p>

                {/* XEM THÊM Button */}
                <a
                  href={`/blogs/${blog.slug || blog.id}`}
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
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMoreBlogs && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-8 py-3 bg-[#8B7355] text-white font-medium rounded-lg hover:bg-[#6B5A47] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang tải...
              </>
            ) : (
              'Xem thêm'
            )}
          </button>
        </div>
      )}

      {/* Error state cho load more */}
      {error && blogs.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => searchParams.get('search') && performSearch(searchParams.get('search')!, currentPage + 1, true)}
            className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
          >
            Thử lại
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogsSearchView;

import React from "react";
import type { RelatedBlogsListProps } from "@/models/BlogsDetailType/BlogsDetailType";

/**
 * Component hiển thị danh sách bài viết liên quan
 * Hiển thị các bài viết cùng category
 */
const RelatedBlogsList: React.FC<RelatedBlogsListProps> = ({
  relatedBlogs,
  onNavigate,
}) => {
  if (relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bài viết liên quan
          </h2>
          <div className="w-24 h-1 bg-[#B8860B] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedBlogs.map((relatedBlog) => (
            <div
              key={relatedBlog.id}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={relatedBlog.image}
                  alt={relatedBlog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {relatedBlog.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#B8860B] text-white rounded-full text-xs font-medium">
                      {relatedBlog.category}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{relatedBlog.date}</span>
                  {relatedBlog.readTime && (
                    <>
                      <span>•</span>
                      <span>{relatedBlog.readTime}</span>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#B8860B] transition-colors line-clamp-2">
                  <button
                    onClick={() => onNavigate(`/blogs/${relatedBlog.slug || relatedBlog.id}`)}
                  >
                    {relatedBlog.title}
                  </button>
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {relatedBlog.description}
                </p>

                <button
                  onClick={() => onNavigate(`/blogs/${relatedBlog.slug || relatedBlog.id}`)}
                  className="inline-flex items-center gap-2 text-[#B8860B] font-medium text-sm hover:gap-3 transition-all duration-200"
                >
                  Đọc thêm
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBlogsList;

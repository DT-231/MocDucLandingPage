import React from "react";
import type { BlogsDetailSidebarProps } from "@/models/BlogsDetailType/BlogsDetailType";

/**
 * Component sidebar của trang blog detail
 * Bao gồm search, categories, recent blogs, tags và archives
 */
const BlogsDetailSidebar: React.FC<BlogsDetailSidebarProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearchSubmit,
  categories,
  recentBlogs,
  tags,
  archives,
  onNavigate,
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-6 bg-four">
        {/* Search Box */}
        <div className="p-6">
          <form onSubmit={onSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Thể loại */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-[#B8860B] mb-6">
            Thể loại
          </h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between text-sm"
              >
                <button className="text-gray-700 hover:text-[#B8860B] transition-colors capitalize">
                  {category.name}
                </button>
                <span className="text-gray-500">
                  ({category.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bài viết gần đây */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-[#B8860B] mb-6">
            Bài viết gần đây
          </h3>
          <div className="space-y-4">
            {recentBlogs.map((item) => (
              <div key={item.id} className="group">
                <button
                  onClick={() => onNavigate(`/blogs/${item.slug || item.id}`)}
                  className="block w-full text-left"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-300 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-[#B8860B] mb-1 leading-relaxed">
                        Eget est lorem ipsum dolor sit amet
                        consectetur...
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-[#B8860B] mb-6">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 border border-gray-400 text-sm text-gray-700 hover:bg-[#B8860B] hover:text-white hover:border-[#B8860B] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Note - Archive theo tháng */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-[#B8860B] mb-6">
            Note
          </h3>
          <div className="space-y-3">
            {archives.map((archive) => (
              <div key={archive.name} className="text-sm">
                <button className="text-[#B8860B] hover:text-[#A0741A] transition-colors underline">
                  {archive.name}
                </button>
                <span className="text-gray-500 ml-1">
                  ({archive.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetailSidebar;

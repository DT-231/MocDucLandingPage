import React from "react";
import { sampleBlogs } from "@/data/newsData";
import BlogsItem from "@/components/BlogsItem/BlogsItem";

interface BlogViewModelProps {
  limit?: number;
  className?: string;
  showViewAllButton?: boolean;
}

const BlogViewModel: React.FC<BlogViewModelProps> = ({
  limit = 3,
  className = "",
  showViewAllButton = true,
}) => {
  const displayNews = limit ? sampleBlogs.slice(0, limit) : sampleBlogs;

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            TIN TỨC MỚI NHẤT
          </h2>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {displayNews.map((news) => (
            <BlogsItem key={news.id} blogs={news} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAllButton && limit && sampleBlogs.length > limit && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md">
              Xem tất cả tin tức
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogViewModel;

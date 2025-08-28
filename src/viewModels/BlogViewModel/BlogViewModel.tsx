import React from "react";
import { sampleBlogs } from "@/data/newsData";
import BlogsItem from "@/components/BlogsItem/BlogsItem";

interface BlogViewModelProps {
  limit?: number;
  className?: string;
}

const BlogViewModel: React.FC<BlogViewModelProps> = ({
  limit = 3,
  className = "",
}) => {
  const displayNews = limit ? sampleBlogs.slice(0, limit) : sampleBlogs;

  return (
    <section className={`py-16 bg-gray-50 font-primary ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            TIN TỨC MỚI NHẤT
          </h2>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {displayNews.map((news) => (
            <BlogsItem key={news.id} blogs={news} />
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default BlogViewModel;

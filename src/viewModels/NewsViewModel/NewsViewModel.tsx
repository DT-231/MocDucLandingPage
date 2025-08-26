import React from "react";
import { sampleNews } from "@/data/newsData";
import NewsItem from "@/components/NewsItem/NewsItem";

interface NewsViewModelProps {
  limit?: number;
  className?: string;
  showViewAllButton?: boolean;
}

const NewsViewModel: React.FC<NewsViewModelProps> = ({
  limit = 3,
  className = "",
  showViewAllButton = true,
}) => {
  const displayNews = limit ? sampleNews.slice(0, limit) : sampleNews;

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
            <NewsItem key={news.id} news={news} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAllButton && limit && sampleNews.length > limit && (
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

export default NewsViewModel;

import React from 'react';
import type { News } from '@/models/NewsType/NewsType';

interface NewsItemProps {
  news: News;
  showReadMore?: boolean;
  className?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ 
  news, 
  showReadMore = true, 
  className = "" 
}) => {
  return (
    <article className={`relative border-b-1 border-third pb-10 overflow-hidden ${className}`}>
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-80 h-80 ">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Date Overlay */}
          <div className="absolute top-0 left-0 bg-white bg-opacity-95 px-4 py-3 ">
            <div className="text-2xl font-bold text-primary leading-none">
              {news.date.split(' ')[0]}
            </div>
            <div className="text-xs text-gray-600 mt-1 leading-tight uppercase tracking-wide">
              {news.date.split(' ').slice(1).join(' ')}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight hover:text-primary transition-colors duration-200 cursor-pointer uppercase tracking-wide">
              {news.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 md:line-clamp-4 mb-4 md:mb-6">
              {news.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            {showReadMore && (
              <button className="text-primary text-sm font-medium hover:opacity-80 transition-all duration-200 flex items-center gap-2 uppercase tracking-wide">
                Read More 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsItem;

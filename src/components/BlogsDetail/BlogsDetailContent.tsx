import React from "react";
import type { BlogsDetailContentProps } from "@/models/BlogsDetailType/BlogsDetailType";
import { Calendar, Clock } from "lucide-react";
import "./BlogsDetailContent.css";

/**
 * Component hiển thị nội dung chính của bài blog
 * Bao gồm breadcrumb, meta info và nội dung chi tiết
 */
const BlogsDetailContent: React.FC<BlogsDetailContentProps> = ({ 
  blog 
}) => {
  return (
    <div className="lg:col-span-3">
      {/* Nội dung bài viết */}
      <div className="overflow-hidden">
        <div className="">
          {/* Meta thông tin */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            
            <span className="flex items-center gap-1">
              <Calendar />
              {blog.date}
            </span>
            {blog.readTime && (
              <span className="flex items-center gap-1">
               <Clock />
                {blog.readTime}
              </span>
            )}
          </div>

          {/* Nội dung chi tiết */}
          <article className="prose prose-lg max-w-none">
            {/* Mô tả ngắn */}
            <div id="introduction" className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                {blog.description}
              </p>
            </div>

            {/* Render toàn bộ nội dung HTML từ blog */}
            {blog.content && (
              <div 
                className="blog-content prose prose-lg max-w-none prose-headings:text-[#8B7355] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md prose-strong:text-gray-900 prose-img:mx-auto prose-img:my-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{
                  // Custom CSS cho các element bên trong
                  fontSize: '16px',
                  lineHeight: '1.75'
                }}
              />
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetailContent;

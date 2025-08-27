import React from "react";
import type { BlogsDetailHeaderProps } from "@/models/BlogsDetailType/BlogsDetailType";

/**
 * Component hiển thị header của trang blog detail
 * Bao gồm tiêu đề lớn và hình ảnh banner
 */
const BlogsDetailHeader: React.FC<BlogsDetailHeaderProps> = ({ 
  title, 
  image, 
  altText 
}) => {
  return (
    <section className="pt-40 flex justify-center">
      <div className="text-left">
        <h1 className="text-4xl max-w-3xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
          {title}
        </h1>
      </div>
      <div className="aspect-video max-h-[400px]">
        <img
          src={image}
          alt={altText || title}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default BlogsDetailHeader;

import React from "react";
import type { BlogsDetailContentProps } from "@/models/BlogsDetailType/BlogsDetailType";

/**
 * Component hiển thị nội dung chính của bài blog
 * Bao gồm breadcrumb, meta info và nội dung chi tiết
 */
const BlogsDetailContent: React.FC<BlogsDetailContentProps> = ({ 
  blog, 
  onNavigate 
}) => {
  return (
    <div className="lg:col-span-3">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button
              onClick={() => onNavigate("/")}
              className="hover:text-[#B8860B] transition-colors"
            >
              Trang chủ
            </button>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <button
              onClick={() => onNavigate("/blogs")}
              className="hover:text-[#B8860B] transition-colors"
            >
              Blog
            </button>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-900 font-medium truncate max-w-md">
            {blog.title}
          </li>
        </ol>
      </nav>

      {/* Nội dung bài viết */}
      <div className="overflow-hidden">
        <div className="">
          {/* Meta thông tin */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            {blog.category && (
              <span className="px-3 py-1 bg-[#B8860B] text-white rounded-full text-xs font-medium">
                {blog.category}
              </span>
            )}
            <span className="flex items-center gap-1">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {blog.date}
            </span>
            {blog.readTime && (
              <span className="flex items-center gap-1">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {blog.readTime}
              </span>
            )}
          </div>

          {/* Nội dung chi tiết */}
          <article className="prose prose-lg max-w-none">
            <div id="introduction" className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {blog.description}
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Eget est lorem ipsum dolor sit amet consectetur
                adipiscing elit. Massa tincidunt dui ut ornare lectus
                sit amet. Enim sit amet venenatis urna cursus. Viverra
                aliquet eget sit amet tellus cras. Tempor nec feugiat
                nisl pretium fusce id velit ut tortor. Neque vitae
                tempus quam pellentesque. Nulla facilisi etiam dignissim
                diam quis enim lobortis. Turpis nunc eget lorem dolor
                sed viverra ipsum nunc aliquet. Pharetra diam sit amet
                nisl. Tempor orci eu lobortis elementum nibh tellus
                molestie nunc non Amet mauris commodo quis imperdiet
                massa. Auctor eu augue ut lectus arcu bibendum.
                Tincidunt praesent semper feugiat nibh sed pulvinar
                proin. Amet nisl purus in mollis nunc sed id semper
                risus.
              </p>
            </div>

            <div id="main-content" className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Eget est lorem ipsum dolor sit amet consectetur
                adipiscing elit. Massa tincidunt dui ut ornare lectus
                sit amet. Enim sit amet venenatis urna cursus. Viverra
                aliquet eget sit amet tellus cras. Tempor nec feugiat
                nisl pretium fusce id velit ut tortor. Neque vitae
                tempus quam pellentesque.
              </p>

              {/* Hình ảnh minh họa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">
                    Hình ảnh minh họa 1
                  </span>
                </div>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">
                    Hình ảnh minh họa 2
                  </span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Risus quis varius quam quisque. Euismod quis viverra
                nibh cras pulvinar mattis nunc sed blandit. Ullamcorper
                morbi tincidunt ornare massa eget egestas purus.
                Senectus et netus et malesuada fames ac turpis egestas
                sed. Auctor urna nunc id cursus metus aliquam eleifend
                mi. Bibendum neque egestas congue quisque egestas diam
                in. Commodo quis imperdiet massa tincidunt nunc.
              </p>
            </div>

            <div id="conclusion" className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Integer malesuada nunc vel risus. Magna ac placerat
                vestibulum lectus mauris ultrices. Cursus in hac
                habitasse platea dictumst quisque sagittis purus sit. Id
                nibh tortor id aliquet lectus proin nibh. Tortor posuere
                ac ut consequat semper. Aenean euismod elementum nisi
                quis eleifend quam adipiscing. Nisl purus in mollis nunc
                sed id semper risus. Id hendrerit rutrum quisque non
                tellus orci ac. Leo a diam sollicitudin tempor id eu
                nisl. Odio aenean sed adipiscing diam donec adipiscing
                tristique risus. Id aliquet lectus proin nibh nisl.
                Pellentesque eu tincidunt tortor aliquam nulla facilisi
                cras fermentum.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetailContent;

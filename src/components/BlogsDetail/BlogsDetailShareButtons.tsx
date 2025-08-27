import React from "react";
import type { BlogsDetailShareButtonsProps } from "@/models/BlogsDetailType/BlogsDetailType";
import PrintButton from "@/components/PrintButton/PrintButton";

/**
 * Component hiển thị các nút chia sẻ bài viết
 * Bao gồm Facebook, Twitter, Copy Link và Print
 */
const BlogsDetailShareButtons: React.FC<BlogsDetailShareButtonsProps> = ({
  onShareFacebook,
  onShareTwitter,
  onCopyLink,
  blog,
}) => {
  return (
    <div className="border-t pt-8 mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="text-gray-600 font-medium">
          Chia sẻ bài viết:
        </span>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onShareFacebook}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="hidden sm:inline">Facebook</span>
          </button>
          <button
            onClick={onShareTwitter}
            className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-7.29 2.04 13.9 13.9 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            <span className="hidden sm:inline">Twitter</span>
          </button>
          <button
            onClick={onCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="hidden sm:inline">Copy Link</span>
          </button>
          <PrintButton
            title={blog.title}
            content={blog.description}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsDetailShareButtons;

import React from 'react';

const BlogsDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-1"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-1"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Meta Info Skeleton */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content Skeleton */}
          <div className="lg:col-span-3">
            {/* Featured Image Skeleton */}
            <div className="mb-8">
              <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Table of Contents Skeleton */}
              <div className="bg-white p-6 rounded-lg border">
                <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>

              {/* Article Info Skeleton */}
              <div className="bg-white p-6 rounded-lg border">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetailSkeleton;

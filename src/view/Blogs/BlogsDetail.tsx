import { useParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead/SEOHead";
import BlogsDetailSkeleton from "@/components/BlogsDetailSkeleton/BlogsDetailSkeleton";
import FormContactViewModel from "@/viewModels/FormContactViewModel/FormContactViewModel";
import { useBlogsDetailViewModel } from "@/viewModels/BlogsDetailViewModel/BlogsDetailViewModel";
import {
  BlogsDetailHeader,
  BlogsDetailContent,
  BlogsDetailSidebar,
  BlogsDetailShareButtons,
  RelatedBlogsList,
} from "@/components/BlogsDetail";

/**
 * Trang chi tiết blog - View component
 * Sử dụng các component nhỏ và ViewModel để quản lý logic
 */
const BlogsDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  // Sử dụng ViewModel để quản lý logic
  const {
    blog,
    relatedBlogs,
    recentBlogs,
    categories,
    tags,
    archives,
    showBackToTop,
    isLoading,
    searchTerm,
    handleNavigate,
    handleShareFacebook,
    handleShareTwitter,
    handleCopyToClipboard,
    handleSearch,
    handleSearchTermChange,
    scrollToTop,
  } = useBlogsDetailViewModel(slug);

  // Xử lý trường hợp không tìm thấy blog
  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy bài viết
          </h1>
          <button
            onClick={() => handleNavigate("/blogs")}
            className="px-6 py-3 bg-[#B8860B] text-white rounded-lg hover:bg-[#A0741A] transition-colors"
          >
            Quay lại danh sách blog
          </button>
        </div>
      </div>
    );
  }

  // Hiển thị skeleton khi đang loading
  if (isLoading) {
    return <BlogsDetailSkeleton />;
  }

  return (
    <>
      <SEOHead
        title={blog.title}
        description={blog.description}
        image={blog.image}
        category={blog.category}
        type="article"
      />

      <div className="min-w-screen min-h-screen bg-white">
        {/* Header với tiêu đề lớn */}
        <BlogsDetailHeader
          title="10 MẸO HÀNG ĐẦU CHO THIẾT KẾ NỘI THẤT NHÀ BẾP CỦA BẠN"
          image={blog.image}
          altText={blog.title}
        />

        {/* Main Content */}
        <div className="max-w-[1500px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Nội dung chính - 3 cột */}
            <BlogsDetailContent blog={blog} onNavigate={handleNavigate} />

            {/* Sidebar - 1 cột */}
            <BlogsDetailSidebar
              searchTerm={searchTerm}
              onSearchTermChange={handleSearchTermChange}
              onSearchSubmit={handleSearch}
              categories={categories}
              recentBlogs={recentBlogs}
              tags={tags}
              archives={archives}
              onNavigate={handleNavigate}
            />
          </div>

          {/* Share Buttons */}
          <BlogsDetailShareButtons
            onShareFacebook={handleShareFacebook}
            onShareTwitter={handleShareTwitter}
            onCopyLink={handleCopyToClipboard}
            blog={blog}
          />
        </div>

        {/* Related Blogs */}
        <RelatedBlogsList
          relatedBlogs={relatedBlogs}
          onNavigate={handleNavigate}
        />

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-[#B8860B] text-white rounded-full shadow-lg hover:bg-[#A0741A] transition-colors duration-200 z-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
        
        <FormContactViewModel isContactPage={true} />
      </div>
    </>
  );
};
export default BlogsDetail;

import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleNews } from '@/data/newsData';
import SEOHead from '@/components/SEOHead/SEOHead';
import NewsDetailSkeleton from '@/components/NewsDetailSkeleton/NewsDetailSkeleton';
import PrintButton from '@/components/PrintButton/PrintButton';

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const news = sampleNews.find(n => n.slug === slug);
  const relatedNews = sampleNews.filter(n => n.id !== news?.id && n.category === news?.category).slice(0, 3);
  const otherNews = sampleNews.filter(n => n.id !== news?.id && n.category !== news?.category).slice(0, 2);

  // Table of Contents
  const tableOfContents = [
    { id: 'introduction', title: 'Giới thiệu', level: 1 },
    { id: 'main-content', title: 'Nội dung chính', level: 1 },
    { id: 'tips-and-tricks', title: 'Mẹo và thủ thuật', level: 2 },
    { id: 'conclusion', title: 'Kết luận', level: 1 },
  ];

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Track scroll position and handle loading
  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show/hide back to top button
      setShowBackToTop(scrollY > 400);
      
      // Track active section
      const sections = tableOfContents.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Share functions
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(news?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Đã copy link bài viết!');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
          <button 
            onClick={() => navigate('/news')}
            className="px-6 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#A0741A] transition-colors duration-200"
          >
            Quay lại danh sách tin tức
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <NewsDetailSkeleton />;
  }

  return (
    <>
      <SEOHead 
        title={news.title}
        description={news.description}
        image={news.image}
        category={news.category}
        type="article"
      />
      
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><button onClick={() => navigate('/')} className="hover:text-[#B8860B] transition-colors">Trang chủ</button></li>
              <li><span className="text-gray-400">/</span></li>
              <li><button onClick={() => navigate('/news')} className="hover:text-[#B8860B] transition-colors">Tin tức</button></li>
              <li><span className="text-gray-400">/</span></li>
              <li className="text-gray-900 font-medium truncate max-w-md">{news.title}</li>
            </ol>
          </nav>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="px-3 py-1 bg-[#B8860B] text-white rounded-full text-xs font-medium">
              {news.category}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {news.date}
            </span>
            {news.readTime && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {news.readTime}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {news.title}
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            {news.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6">
                
                {/* Introduction Section */}
                <section id="introduction">
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-[#B8860B] pb-2">
                    Giới thiệu
                  </h2>
                  <p>
                    Ngành xây dựng và thiết kế nội thất đang không ngừng phát triển với nhiều xu hướng mới. 
                    Trong bài viết này, chúng tôi sẽ chia sẻ những kinh nghiệm và mẹo hữu ích để bạn có thể 
                    tạo ra một không gian sống hoàn hảo cho gia đình mình.
                  </p>
                  <p>
                    Việc thiết kế không gian sống không chỉ là sắp xếp đồ đạc mà còn phải đảm bảo sự hài hòa 
                    giữa công năng và thẩm mỹ. Mỗi chi tiết đều có ý nghĩa riêng và góp phần tạo nên tổng thể 
                    hoàn chỉnh.
                  </p>
                </section>

                {/* Main Content Section */}
                <section id="main-content">
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-[#B8860B] pb-2">
                    Nội dung chính
                  </h2>
                  <p>
                    Thiết kế nội thất không chỉ là việc sắp xếp đồ đạc một cách hợp lý mà còn phải đảm bảo 
                    tính thẩm mỹ và công năng sử dụng. Mỗi không gian trong nhà đều có những đặc điểm riêng 
                    và cần được thiết kế phù hợp với nhu cầu của gia đình.
                  </p>

                  {/* Quote Box */}
                  <div className="bg-[#B8860B]/10 border-l-4 border-[#B8860B] p-6 my-8">
                    <blockquote className="text-gray-800 italic text-lg">
                      "Thiết kế tốt không chỉ đẹp mắt mà còn phải phù hợp với cuộc sống thực tế của gia đình."
                    </blockquote>
                  </div>
                </section>

                {/* Tips and Tricks Section */}
                <section id="tips-and-tricks">
                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Mẹo và thủ thuật</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border">
                      <h4 className="font-semibold text-gray-900 mb-3">Tối ưu hóa không gian</h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Sử dụng đồ nội thất đa chức năng</li>
                        <li>Tận dụng không gian dọc</li>
                        <li>Chọn màu sáng để không gian rộng hơn</li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border">
                      <h4 className="font-semibold text-gray-900 mb-3">Ánh sáng và màu sắc</h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Kết hợp ánh sáng tự nhiên và nhân tạo</li>
                        <li>Sử dụng gương để phản chiếu ánh sáng</li>
                        <li>Chọn bảng màu hài hòa</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Conclusion Section */}
                <section id="conclusion">
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-[#B8860B] pb-2">
                    Kết luận
                  </h2>
                  <p>
                    Việc thiết kế và thi công một không gian sống lý tưởng đòi hỏi sự kết hợp giữa kinh nghiệm, 
                    sáng tạo và hiểu biết về nhu cầu của khách hàng. Hy vọng những chia sẻ trên sẽ giúp ích 
                    cho dự án của bạn.
                  </p>
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200 mt-6">
                    <p className="text-green-800 font-medium">
                      💡 <strong>Lời khuyên:</strong> Hãy luôn tham khảo ý kiến của chuyên gia và đừng ngần ngại 
                      thử nghiệm những ý tưởng mới để tạo ra không gian sống độc đáo riêng cho mình.
                    </p>
                  </div>
                </section>
              </div>
            </article>

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-gray-600 font-medium">Chia sẻ bài viết:</span>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={shareOnFacebook}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="hidden sm:inline">Facebook</span>
                  </button>
                  <button 
                    onClick={shareOnTwitter}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    <span className="hidden sm:inline">Twitter</span>
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="hidden sm:inline">Copy Link</span>
                  </button>
                  <PrintButton
                    title={news.title}
                    content={news.description}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Table of Contents */}
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Mục lục</h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === item.id 
                          ? 'bg-[#B8860B] text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      } ${item.level === 2 ? 'ml-4' : ''}`}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Article Info */}
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin bài viết</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-gray-600">Chuyên mục:</span>
                    <span className="font-medium text-[#B8860B]">{news.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">Ngày đăng:</span>
                    <span className="font-medium">{news.date}</span>
                  </div>
                  {news.readTime && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Thời gian đọc:</span>
                      <span className="font-medium">{news.readTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Other News */}
              {otherNews.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md border">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Tin tức khác</h3>
                  <div className="space-y-4">
                    {otherNews.map((item) => (
                      <div key={item.id} className="group">
                        <a 
                          href={`/news/${item.slug}`}
                          className="block"
                        >
                          <div className="flex gap-3">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                            />
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#B8860B] line-clamp-2 mb-1">
                                {item.title}
                              </h4>
                              <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="bg-white py-16 border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bài viết liên quan</h2>
              <div className="w-24 h-1 bg-[#B8860B] mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((relatedNewsItem) => (
                <div key={relatedNewsItem.id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={relatedNewsItem.image} 
                      alt={relatedNewsItem.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#B8860B] text-white rounded-full text-xs font-medium">
                        {relatedNewsItem.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{relatedNewsItem.date}</span>
                      {relatedNewsItem.readTime && (
                        <>
                          <span>•</span>
                          <span>{relatedNewsItem.readTime}</span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#B8860B] transition-colors line-clamp-2">
                      <a href={`/news/${relatedNewsItem.slug}`}>
                        {relatedNewsItem.title}
                      </a>
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {relatedNewsItem.description}
                    </p>
                    
                    <a 
                      href={`/news/${relatedNewsItem.slug}`}
                      className="inline-flex items-center gap-2 text-[#B8860B] font-medium text-sm hover:gap-3 transition-all duration-200"
                    >
                      Đọc thêm
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/news')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#B8860B] text-white font-medium rounded-lg hover:bg-[#A0741A] transition-colors duration-200"
              >
                Xem tất cả tin tức
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-[#B8860B] text-white rounded-full shadow-lg hover:bg-[#A0741A] transition-all duration-300 transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
      )}
      </div>
    </>
  );
};

export default NewsDetail;

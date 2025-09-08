import { useState, useEffect } from 'react';
import Images from '@assets/Images';

const PartnerBrands = () => {
  // Dữ liệu các thương hiệu đối tác
  const brands = [
    {
      id: 1,
      name: 'Taking Kitchen & More',
      image: Images.takingLogoImage,
      alt: 'Taking Kitchen & More Logo'
    },
    {
      id: 2,
      name: 'ACC Panel',
      image: Images.accPanelLogoImage,
      alt: 'ACC Panel Logo'
    },
    {
      id: 3,
      name: 'Fulco',
      image: Images.fulcoLogoImage,
      alt: 'Fulco Logo'
    },
    {
      id: 4,
      name: 'ALD',
      image: Images.aldLogoImage,
      alt: 'ALD Logo'
    },
    {
      id: 5,
      name: 'An Cường',
      image: Images.anCuongLogoImage,
      alt: 'An Cường Logo'
    },
    {
      id: 6,
      name: 'Mộc Phát',
      image: Images.mocPhatLogoImage,
      alt: 'Mộc Phát Logo'
    }
  ];

  // State để quản lý slide hiện tại
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tính số slide cần thiết dựa trên screen size
  // Mobile: 2 brands per slide, Desktop: 3 brands per slide
  const getBrandsPerSlide = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 3 : 2; // md breakpoint là 768px
    }
    return 3; // default cho server-side rendering
  };

  const [brandsPerSlide, setBrandsPerSlide] = useState(getBrandsPerSlide());
  const totalSlides = Math.ceil(brands.length / brandsPerSlide);

  // Effect để handle resize window
  useEffect(() => {
    const handleResize = () => {
      setBrandsPerSlide(getBrandsPerSlide());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect để tự động chuyển slide mỗi 3 giây
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000); // 3000ms = 3 giây

    // Cleanup interval khi component unmount hoặc totalSlides thay đổi
    return () => clearInterval(slideInterval);
  }, [totalSlides]);

  // Function để lấy brands cho slide hiện tại
  const getCurrentSlideBrands = (slideIndex: number) => {
    const startIndex = slideIndex * brandsPerSlide;
    const endIndex = startIndex + brandsPerSlide;
    return brands.slice(startIndex, endIndex);
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-[#fefffa] font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
            ĐỐI TÁC TIÊU BIỂU
          </h2>
         
        </div>

        {/* Brands Slide Container */}
        <div className="relative overflow-hidden">
          {/* Brands Slide */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                  {getCurrentSlideBrands(slideIndex).map((brand) => (
                    <div
                      key={brand.id}
                      className=" rounded-lg  transition-shadow duration-300 p-6 sm:p-8 md:p-10"
                    >
                      <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center">
                        <img
                          src={brand.image}
                          alt={brand.alt}
                          className="max-h-full max-w-full object-contain "
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default PartnerBrands;

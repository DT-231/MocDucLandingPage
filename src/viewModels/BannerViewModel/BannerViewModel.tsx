

import React, { useState, useEffect } from 'react';
import Images from '../../assets/Images';
import Button from '@components/Button/Button';

interface BannerProps {
  type: 'home' | 'other';
  title?: string;
  subtitle?: string;
  showButton?: boolean;
}

const BannerViewModel: React.FC<BannerProps> = ({ 
  type, 
  title, 
  subtitle, 
  showButton = false 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow data for home banner
  const slides = [
    {
      image: Images.bannerSlide1,
    },
    {
      image: Images.bannerSlide2,
    },
    {
      image: Images.bannerSlide3,
    }
  ];

  // Auto slideshow for home banner
  useEffect(() => {
    if (type === 'home') {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [type, slides.length]);

  const bannerClasses = type === 'home' 
    ? 'h-80 sm:h-96 md:h-[500px] lg:h-screen bg-cover bg-center flex items-center justify-start px-4 sm:px-8 md:px-12 lg:px-20 relative transition-all duration-1000'
    : 'h-60 sm:h-80 md:h-96 bg-cover bg-center flex items-center justify-center relative';

  const overlayClasses = type === 'home'
    ? 'absolute inset-0 bg-gradient-to-t from-white/5 via-white/5 to-[#9F8467] z-10'
    : 'absolute inset-0 bg-gradient-to-t from-white/5 via-[#B9A590]/75 to-[#9F8467] z-10';

  const currentSlideData = type === 'home' ? slides[currentSlide] : null;
  const backgroundImage = type === 'home' ? currentSlideData?.image : Images.bannerHomeImage;

  return (
    <div 
      className={bannerClasses}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={overlayClasses}></div>
      
      {/* Slide indicators for home banner */}
      {type === 'home' && (
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      <div className={`relative z-20 text-white ${type === 'home' ? 'text-left' : 'text-center'} max-w-full px-4 sm:px-0`}>
        {type === 'home' ? (
          <>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-second font-bold mb-3 sm:mb-4 md:mb-6 drop-shadow-lg transition-all duration-500 leading-tight">
              NỘI THẤT MỘC ĐỨC
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-6 sm:mb-8 drop-shadow-md font-light transition-all duration-500 max-w-4xl leading-relaxed">
              THIẾT KẾ TINH GỌN - NÂNG TẦM KHÔNG GIAN SỐNG
            </p>
            {showButton && (
              <Button primary={true} classNames={"rounded-4xl text-xs sm:text-sm md:text-base lg:text-lg font-light uppercase tracking-wider transition-all duration-300 hover:bg-[#8A7258] px-4 sm:px-6 md:px-8 py-2 sm:py-3"}>
                VIEW PROJECT
              </Button>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg">
              {title || 'ABOUT US'}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-8 drop-shadow-md">
                {subtitle}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BannerViewModel;


import { useState, useEffect } from 'react';

const ConstructionCategories = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);

    const categories = [
        {
            id: 1,
            title: "PHÒNG KHÁCH",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "PHÒNG BẾP",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            title: "PHÒNG NGỦ",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            title: "NGUYÊN CĂN",
            image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            title: "PHÒNG LÀM VIỆC",
            image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            title: "BAN CÔNG",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    // Responsive cards per view
    useEffect(() => {
        const updateCardsPerView = () => {
            const screenWidth = window.innerWidth;
            const cardWidth = 361; // Card width + gap
            const gap = 24; // gap-6 = 24px
            const margin = 96; // mx-12 = 48px each side
            
            const availableWidth = screenWidth - margin;
            const cardsCanFit = Math.floor(availableWidth / (cardWidth + gap));
            
            if (screenWidth < 768) {
                setCardsPerView(1);
            } else if (cardsCanFit >= 3) {
                setCardsPerView(3);
            } else if (cardsCanFit >= 2) {
                setCardsPerView(2);
            } else {
                setCardsPerView(1);
            }
            setCurrentSlide(0); // Reset to first slide when changing view
        };

        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    // Auto slide effect
    useEffect(() => {
        const maxSlides = Math.max(0, categories.length - cardsPerView);
        if (maxSlides > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => {
                    if (prev >= maxSlides) {
                        return 0; // Reset to beginning
                    }
                    return prev + cardsPerView; // Chuyển theo số lượng cards hiển thị
                });
            }, 4000); // Chuyển slide mỗi 4 giây

            return () => clearInterval(interval);
        }
    }, [categories.length, cardsPerView]);

    const nextSlide = () => {
        const maxSlides = Math.max(0, categories.length - cardsPerView);
        setCurrentSlide((prev) => Math.min(prev + cardsPerView, maxSlides));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - cardsPerView, 0));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="py-16 bg-gradient-to-b from-white to-second/20">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-primary mb-4">
                        HẠNG MỤC THI CÔNG
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-lg text-third max-w-2xl mx-auto">
                        Chúng tôi chuyên thiết kế và thi công các không gian sống hiện đại, 
                        mang lại sự tiện nghi và thẩm mỹ cho ngôi nhà của bạn.
                    </p>
                </div>

                {/* Cards Slider Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button 
                        onClick={prevSlide}
                        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/80 rounded-full p-3 text-white transition-all duration-300 group shadow-lg"
                        style={{ left: '-20px' }}
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <button 
                        onClick={nextSlide}
                        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/80 rounded-full p-3 text-white transition-all duration-300 group shadow-lg"
                        style={{ right: '-20px' }}
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Cards Slider */}
                    <div className="overflow-hidden mx-8 md:mx-12">
                        <div 
                            className="flex transition-transform duration-700 ease-in-out gap-6"
                            style={{ transform: `translateX(-${currentSlide * (361 + 24)}px)` }}
                        >
                            {categories.map((category) => (
                                <div 
                                    key={category.id} 
                                    className="flex-shrink-0"
                                >
                                    <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full" style={{ width: '361px', height: '528px' }}>
                                        {/* Card Image with Overlay and Title */}
                                        <div className="w-full h-full relative overflow-hidden">
                                            <img 
                                                src={category.image}
                                                alt={category.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            
                                            {/* Primary Color Overlay */}
                                            <div className="absolute inset-0 bg-primary opacity-50"></div>
                                            
                                            {/* Title on Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <h3 className="text-white font-bold text-xl md:text-2xl text-center px-4 tracking-wider drop-shadow-lg">
                                                    {category.title}
                                                </h3>
                                            </div>
                                            
                                            {/* Hover Effect Overlay */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: Math.ceil(categories.length / cardsPerView) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index * cardsPerView)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    Math.floor(currentSlide / cardsPerView) === index 
                                        ? 'bg-primary scale-125' 
                                        : 'bg-third/30 hover:bg-third/60'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConstructionCategories;
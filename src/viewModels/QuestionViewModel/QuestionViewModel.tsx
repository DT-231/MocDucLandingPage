import { useState, useEffect } from 'react';
import Images from '@assets/Images';

const QuestionViewModel = () => {
  // Dữ liệu câu hỏi thường gặp
  const faqs = [
    {
      id: 1,
      question: "Tôi chỉ cần thiết kế, không thi công. Mộc Đức có nhận không?",
      answer: "Có! Mộc Đức cung cấp linh hoạt dịch vụ từ thiết kế riêng lẻ đến thi công trọn gói, phù hợp với nhu cầu và ngân sách của bạn."
    },
    {
      id: 2,
      question: "Tôi có thể tùy chỉnh phong cách thiết kế theo ý mình không?",
      answer: "Chắc chắn rồi! Chúng tôi sẽ làm việc 1:1 với bạn để đảm bảo mỗi không gian đều phản ánh đúng gu thẩm mỹ và phong cách sống của gia chủ."
    },
    {
      id: 3,
      question: "Thời gian thi công một dự án thường mất bao lâu?",
      answer: "Thời gian thi công phụ thuộc vào quy mô dự án, thường từ 2-6 tuần. Chúng tôi sẽ đưa ra timeline cụ thể sau khi khảo sát thực tế."
    },
    {
      id: 4,
      question: "Mộc Đức có bảo hành cho sản phẩm không?",
      answer: "Có! Chúng tôi cung cấp bảo hành từ 12-24 tháng tùy theo loại sản phẩm và cam kết hỗ trợ bảo dưỡng định kỳ."
    }
  ];

  // State để quản lý slide hiện tại
  const [currentSlide, setCurrentSlide] = useState(0);

  // Effect để tự động chuyển slide mỗi 3 giây
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2); // Chỉ có 2 slide (0 và 1)
    }, 3000); // 3000ms = 3 giây

    // Cleanup interval khi component unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-white font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
            CÂU HỎI THƯỜNG GẶP
          </h2>
          <p className="text-sm sm:text-base md:text-lg  text-third w-fit  text-center leading-relaxed">
            Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh vực
            thi công và thiết kế nội thất.
            {/* <br className="hidden sm:block" /> */}
            Tự tin là đối tác đáng tin cậy trong các lĩnh vực sau.
          </p>
        </div>

        {/* FAQ Slide Container */}
        <div className="relative overflow-hidden">
          {/* FAQ Slide */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Slide 1: FAQ 1 & 2 */}
            <div className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
                {faqs.slice(0, 2).map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white"
                  >
                    {/* Quote Icon */}
                    <div className="mb-3 sm:mb-4">
                      <div className='w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]'>
                        <img src={Images.iconKepImage} alt="Quote" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    
                    {/* Question */}
                    <h3 className="pl-6 sm:pl-8 md:pl-10 min-h-[60px] sm:min-h-[80px] md:min-h-[80px] text-lg sm:text-xl font-extrabold text-primary mb-3 sm:mb-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    
                    {/* Answer */}
                    <p className="pl-6 sm:pl-8 md:pl-10 text-third leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl font-extrabold">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide 2: FAQ 3 & 4 */}
            <div className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
                {faqs.slice(2, 4).map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white"
                  >
                    {/* Quote Icon */}
                    <div className="mb-3 sm:mb-4">
                      <div className='w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]'>
                        <img src={Images.iconKepImage} alt="Quote" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    
                    {/* Question */}
                    <h3 className="pl-6 sm:pl-8 md:pl-10 min-h-[60px] sm:min-h-[80px] md:min-h-[80px] text-lg sm:text-xl font-extrabold text-primary mb-3 sm:mb-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    
                    {/* Answer */}
                    <p className="pl-6 sm:pl-8 md:pl-10 text-third leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl font-extrabold">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Chuyển đến nhóm câu hỏi ${index + 1}`}
              />
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default QuestionViewModel;

import Images from '@assets/Images';

const QuestionViewModel = () => {
  const faqs = [
    {
      id: 1,
      question: "Tôi chỉ cần thiết kế, không thi công. Mộc Đức có nhận không?",
      answer: "Có! Mộc Đức cung cấp linh hoạt dịch vụ từ thiết kế riêng lẻ đến thi công trọn gói, phù hợp với nhu cầu và ngân sách của bạn."
    },
    {
      id: 2,
      question: "Thi công nội thất mất bao lâu?",
      answer: "Chúng tôi luôn ưu tiên tiến độ đúng hẹn. Trung bình một công trình căn hộ từ 2-3 phòng ngủ sẽ hoàn thiện trong vòng 7 ngày, tùy vào quy mô và yêu cầu thiết kế."
    }
  ];

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">
            CÂU HỎI THƯỜNG GẶP
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-third max-w-3xl mx-auto leading-relaxed px-4">
            Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh vực
            thi công và thiết kế nội thất.
            <br className="hidden sm:block" />
            Tự tin là đối tác đáng tin cậy trong các lĩnh vực sau.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white"
            >
              {/* Quote Icon */}
              <div className="mb-3 sm:mb-4">
                <div className='w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]'>
                  <img src={Images.iconKepImage} alt="Quote" className="w-full h-full object-contain" />
                </div>
              </div>
              
              {/* Question */}
              <h3 className="pl-6 sm:pl-8 md:pl-10 min-h-[60px] sm:min-h-[80px] md:min-h-[80px] text-lg sm:text-xl md:text-2xl font-extrabold text-primary mb-3 sm:mb-4 leading-relaxed flex items-center">
                {faq.question}
              </h3>
              
              {/* Answer */}
              <p className="pl-6 sm:pl-8 md:pl-10 text-third leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default QuestionViewModel;

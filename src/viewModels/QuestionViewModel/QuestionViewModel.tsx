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
      question: "Tôi có thể tùy chỉnh phong cách thiết kế theo ý mình không?",
      answer: "Chắc chắn rồi! Chúng tôi sẽ làm việc 1:1 với bạn để đảm bảo mỗi không gian đều phản ánh đúng gu thẩm mỹ và phong cách sống của gia chủ."
    }
  ];

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-white font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
            CÂU HỎI THƯỜNG GẶP
          </h2>
          <p className="text-sm sm:text-base md:text-lg  text-third max-w-4xl mx-auto leading-relaxed px-4 text-nowrap">
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
                <div className='w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] '>
                  <img src={Images.iconKepImage} alt="Quote" className="w-full h-full object-contain" />
                </div>
              </div>
              
              {/* Question */}
              <h3 className="pl-6 sm:pl-8 md:pl-10 min-h-[60px] sm:min-h-[80px] md:min-h-[80px] text-lg sm:text-xl  font-extrabold text-primary mb-3 sm:mb-4 leading-relaxed ">
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
  );
};

export default QuestionViewModel;

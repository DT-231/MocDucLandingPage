import type { HomePageProcessStep } from '@/models/HomePageType';

// Interface định nghĩa props cho ProcessStepViewModel
interface ProcessStepViewModelProps {
  title?: string;
  description?: string;
  steps?: HomePageProcessStep[];
}

const ProcessStepViewModel: React.FC<ProcessStepViewModelProps> = ({ 
  title = "QUY TRÌNH LÀM VIỆC",
  description = "Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh vực thi công và thiết kế nội thất. Tự tin là đối tác đáng tin cậy trong các lĩnh vực sau.",
  steps = [
    {
      tittle: "01. Khảo sát & Tư vấn",
      description: "Chúng tôi lắng nghe nhu cầu, phong cách và ngân sách của bạn. Sau đó, đội ngũ kỹ thuật sẽ tiến hành khảo sát mặt bằng để tư vấn giải pháp phù hợp nhất."
    },
    {
      tittle: "02. Thiết kế & Chọn màu", 
      description: "Dựa trên thông tin đã thu thập, đội ngũ thiết kế của Mộc Đức sẽ xây dựng concept không gian, phối cảnh 3D, bản vẽ kỹ thuật - đảm bảo tính thẩm mỹ và công năng."
    },
    {
      tittle: "03. Thi công & Lắp đặt",
      description: "Đội ngũ thi công tiến hành sản xuất, lắp đặt nội thất theo đúng màu đã chọn. Toàn bộ quy trình được giám sát kỹ lưỡng để đảm bảo chất lượng, đúng tiến độ và thẩm mỹ."
    },
    {
      tittle: "04. Bàn giao & Bảo hành",
      description: "Sau khi hoàn thiện, công trình được nghiệm thu và bàn giao. Mộc Đức cam kết bảo hành rõ ràng từng hạng mục nội thất trong thời gian sử dụng."
    }
  ]
}) => {
  return (
    <section className="process-section py-8 sm:py-12 md:py-16 bg-[#F6FBF6] font-primary">
      <div className="container max-w-[1200px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl  font-extrabold text-primary mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-third max-w-7xl mx-auto font-extralight leading-[117%] tracking-[6%] px-4">
            {description}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                {step.tittle}
              </h3>
              <p className="text-third font-normal text-sm sm:text-base md:text-lg lg:text-xl leading-[117%] tracking-[6%] text-justify">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepViewModel;

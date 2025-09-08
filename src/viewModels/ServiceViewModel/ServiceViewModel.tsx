import React from "react";
import Button from "@components/Button/Button";
import { MdDesignServices } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import type { HomePageService } from '@/models/HomePageType';

// Interface định nghĩa props cho ServiceViewModel
interface ServiceViewModelProps {
  title?: string;
  description?: string;
  services?: HomePageService[];
}

// Component để render icon dựa trên icon string từ API
const ServiceIcon: React.FC<{ iconName: string }> = ({ iconName }) => {
  // Map các icon từ API với React icons
  const iconMap: { [key: string]: React.ReactElement } = {
    'dashicons-admin-home': <FaHome />,
    'dashicons-lightbulb': <FaLightbulb />,
    'dashicons-admin-tools': <MdDesignServices />,
  };

  return iconMap[iconName] || <MdDesignServices />; // Default icon nếu không tìm thấy
};

const ServiceViewModel: React.FC<ServiceViewModelProps> = ({
  title = "DỊCH VỤ",
  description = "Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh vực thi công và thiết kế nội thất. Tự tin là đối tác đáng tin cậy trong các lĩnh vực sau.",
  services = [
    {
      title: "Thiết kế trọn gói",
      content: "Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh vực thi công và thiết kế nội thất. Tự tin là đối tác đáng tin cậy trong các lĩnh vực thi công nội thất trọn gói.",
      icon: "dashicons-admin-home",
    },
    {
      title: "GIẢI PHÁP CẢI TẠO",
      content: "Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh vực thi công và thiết kế nội thất. Tự tin là đối tác đáng tin cậy trong các lĩnh vực cải tạo và nâng cấp.",
      icon: "dashicons-lightbulb",
    },
    {
      title: "NỘI THẤT & TRANG TRÍ",
      content: "Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh vực thi công và thiết kế nội thất. Tự tin là đối tác đáng tin cậy trong việc trang trí và thiết kế nội thất.",
      icon: "dashicons-admin-tools",
    },
  ]
}) => {
  return (
    <section className="py-10 sm:py-16 md:py-20 px-4 bg-gray-50 font-primary">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section với dữ liệu từ API */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary uppercase tracking-wider mb-4">
            {title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            {description}
          </p>
        </div>

        {/* Services Grid với dữ liệu từ API */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#F9F9F9] border-primary border-2 sm:border-4 lg:border-5 p-4 sm:p-6 md:p-8 flex justify-center flex-col items-center shadow-lg group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 flex justify-center items-center mb-4 sm:mb-6 group-hover:scale-110 rounded-full text-white bg-primary transition-transform duration-300">
                <ServiceIcon iconName={service.icon} />
              </div>
              <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-3 sm:mb-4 text-center px-2">
                {service.title}
              </h4>
              <p className="text-gray-600 leading-relaxed text-center text-sm sm:text-base md:text-lg mb-4 sm:mb-6 line-clamp-4">
                {service.content}
              </p>
              <div className="mt-auto">
                <Button
                  to="/about-us"
                  classNames={
                    "group flex justify-center items-center space-x-2 text-primary font-extrabold"
                  }
                >
                  <span className="text-lg sm:text-xl md:text-2xl tracking-wider flex justify-center items-center">
                    Xem thêm
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.16663 22.0001H34.8333M34.8333 22.0001L22 9.16675M34.8333 22.0001L22 34.8334"
                      stroke="#9F8467"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceViewModel;

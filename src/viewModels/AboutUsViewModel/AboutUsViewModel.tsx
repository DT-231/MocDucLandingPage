import Images from "@assets/Images";
import Button from "@components/Button/Button";
import VideoModal from "@components/VideoModal";
import CountUp from "react-countup";
import { useVideoModal } from "../hooks/useVideoModal";
import type { HomePageAboutIntroImage } from '@/models/HomePageType';

// Interface định nghĩa props cho AboutUsViewModel
interface AboutUsViewModelProps {
  title?: string;
  description?: string;
  image?: HomePageAboutIntroImage;
  videoUrl?: string; // URL video để hiển thị trong modal
  yearsExperience?: string;
  projectExperience?: string;
  customerCount?: string;
}

const AboutUsViewModel: React.FC<AboutUsViewModelProps> = ({
  title = "ABOUT US",
  description = "Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh vực thi công và thiết kế nội thất. Tự tin là đối tác đáng tin cậy trong các lĩnh vực thi công nội thất trọn gói. Thi công phòng ngủ, phòng bếp, ..v.v.",
  image,
  videoUrl = "/videos/demo-video.mp4", // URL video mặc định
  yearsExperience = "15",
  projectExperience = "100",
  customerCount = "100"
}) => {
  // Sử dụng hook để quản lý trạng thái modal video theo kiến trúc MVVM
  const { isOpen: isVideoModalOpen, openModal, closeModal } = useVideoModal("Video giới thiệu về chúng tôi");
  
  // Sử dụng ảnh từ API nếu có, nếu không thì dùng ảnh mặc định
  const displayImage = image?.url || Images.bannerAboutUsImage;

  // Hàm xử lý click vào hình ảnh để mở modal video
  const handleImageClick = () => {
    openModal(videoUrl, "Video giới thiệu về chúng tôi");
  };
  return (
    <div className="w-full bg-[#FEFFFA] py-8 md:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Title với dữ liệu từ API */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-wider">
            {title}
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Image với dữ liệu từ API - click để mở modal video */}
          <div className="relative flex-4 w-full lg:w-auto">
            <div 
              className="aspect-[3/3.5] bg-gray-200 overflow-hidden cursor-pointer group"
              onClick={handleImageClick}
            >
              <img
                src={displayImage}
                alt={image?.alt || "Interior Design"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Play button overlay - hiển thị khi hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20  opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-110">
                  <div className="w-0 h-0 border-l-[16px] sm:border-l-[20px] border-l-primary border-t-[10px] sm:border-t-[12px] border-t-transparent border-b-[10px] sm:border-b-[12px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content với dữ liệu từ API */}
          <div className="space-y-6 md:space-y-8 flex flex-col flex-6 gap-5">
            {/* Description */}
            <div>
              <p className="text-third text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-[118%] tracking-[1px] md:tracking-[2px] text-justify">
                {description}
              </p>
            </div>

            {/* Statistics với dữ liệu từ API */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 font-bold">
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-2xl h-auto sm:h-20 text-primary tracking-wider mb-2">
                  DỰ ÁN ĐÃ LÀM
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary">
                  <CountUp end={parseInt(projectExperience) || 100} duration={8} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-2xl  text-primary h-auto sm:h-20 tracking-wider mb-2">
                  SỐ NĂM KINH NGHIỆM
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary">
                  {yearsExperience}+
                </div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-2xl  text-primary h-auto sm:h-20 tracking-wider mb-2">
                  KHÁCH HÀNG
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary">
                  <CountUp end={parseInt(customerCount) || 100} duration={5} />+
                </div>
              </div>
            </div>

            {/* XEM THÊM Button */}
            <div className="mt-auto pt-4">
              <Button
                to="/about-us"
                classNames={
                  "group flex items-center justify-center sm:justify-start space-x-2 text-primary font-extrabold font-primary" 
                }
              >
                <span className="text-xl sm:text-2xl md:text-3xl  tracking-wider flex justify-center items-center">
                  XEM THÊM
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Modal - hiển thị khi click vào hình ảnh */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeModal}
        videoUrl={videoUrl}
        title="Video giới thiệu về chúng tôi"
      />
    </div>
  );
};

export default AboutUsViewModel;

import Images from "@assets/Images";
import Button from "@components/Button/Button";
import CountUp from "react-countup";

const AboutUsViewModel = () => {
  return (
    <div className="w-full bg-[#FEFFFA] py-8 md:py-16 px-4">
      <div className="max-w-[1300px] mx-auto">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-wider">
            ABOUT US
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Image */}
          <div className="relative flex-4 w-full lg:w-auto">
            <div className="aspect-[3/3.5] bg-gray-200 overflow-hidden">
              <img
                src={Images.bannerAboutUsImage}
                alt="Interior Design"
                className="w-full h-full object-cover"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-l-[12px] sm:border-l-[16px] border-l-primary border-t-[8px] sm:border-t-[10px] border-t-transparent border-b-[8px] sm:border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 md:space-y-8 flex flex-col flex-6">
            {/* Description */}
            <div>
              <p className="text-third text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-[118%] tracking-[1px] md:tracking-[2px] text-justify">
                Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh
                vực thi công và thiết kế nội thất. Tự tin là đối tác đáng tin
                cậy trong các lĩnh vực thi công nội thất trọn gói. Thi công
                phòng ngủ, phòng bếp, ..v.v.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 font-bold">
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-2xl lg:text-3xl h-auto sm:h-20 text-primary tracking-wider mb-2">
                  DỰ ÁN ĐÃ LÀM
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary">
                  <CountUp end={100} duration={8} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-2xl lg:text-3xl text-primary h-auto sm:h-20 tracking-wider mb-2">
                  SỐ NĂM KINH NGHIỆM
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary">15+</div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-2xl lg:text-3xl text-primary h-auto sm:h-20 tracking-wider mb-2">
                  KHÁCH HÀNG
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary">
                  <CountUp end={100} duration={5} />+
                </div>
              </div>
            </div>

            {/* Read More Button */}
            <div className="mt-auto pt-4">
              <Button to="/about-us" classNames={"group flex items-center justify-center sm:justify-start space-x-2 text-primary font-extrabold"}>
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider">Read More</span>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsViewModel;

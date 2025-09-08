import Images from "@/assets/Images";
import { useAboutUsHistoryViewModel } from "./useAboutUsHistoryViewModel";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";

const AboutUsHistory = () => {
  // Sử dụng ViewModel để quản lý state và logic
  const {
    isLoading,
    error,
    hasData,
    title,
    description,
    imageDown,
    imageUp,
    imageDownAlt,
    imageUpAlt,
    retryFetch
  } = useAboutUsHistoryViewModel();

  // Hiển thị loading khi đang fetch dữ liệu
  if (isLoading) {
    return (
      <section className="w-full py-8 sm:py-12 md:py-16 bg-gray-50 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-20 my-6 sm:my-8 lg:my-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  // Hiển thị error khi có lỗi
  if (error && !hasData) {
    return (
      <section className="w-full py-8 sm:py-12 md:py-16 bg-gray-50 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-20 my-6 sm:my-8 lg:my-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <ErrorDisplay 
              error={error}
              onRetry={retryFetch}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 bg-gray-50 min-h-fit">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-20 my-6 sm:my-8 lg:my-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="order-1 lg:order-1 space-y-4 sm:space-y-6 my-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-wide text-center lg:text-left">
              {title}
            </h2>
            <div className="space-y-3 sm:space-y-4 text-third text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide leading-relaxed">
              <p>
                {description || 'Chúng tôi là đội ngũ trẻ trung và sáng tạo, luôn nỗ lực mang đến những giải pháp tối ưu và giá trị bền vững cho khách hàng. Với tinh thần trách nhiệm, uy tín và không ngừng đổi mới, chúng tôi hướng đến việc xây dựng một thương hiệu đáng tin cậy, đồng hành cùng sự phát triển của bạn.'}
              </p>
            </div>
          </div>

          {/* Images Section */}
          <div className="order-2 lg:order-2 relative flex justify-center h-[700px] md:h-[1000px]">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[400px] sm:h-[500px] md:h-[600px]">
              {/* Main Background Image */}
              <div className="absolute top-0 left-0 w-full  sm:h-[65%] md:h-[700px] z-10">
                <img
                  src={imageDown || Images.aboutUsDownImage}
                  alt={imageDownAlt}
                  className="w-full h-full object-cover "
                />
              </div>

              {/* Overlapping Image (đè lên 1/3 ảnh Down) */}
              <div className="absolute top-[35%] sm:top-[40%] md:top-[400px] right-0 w-full  sm:h-[50%] md:h-[700px] translate-x-[15%] sm:translate-x-[20%] md:translate-x-[50%] shadow-lg z-20">
                <img
                  src={imageUp || Images.aboutUsUpImage}
                  alt={imageUpAlt}
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHistory;

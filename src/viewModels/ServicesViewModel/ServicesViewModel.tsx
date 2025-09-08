import { Lightbulb, NotebookPen, PaintRoller } from "lucide-react";
import { useServicesViewModel } from "./useServicesViewModel";
import IconRenderer from "@/components/IconRenderer";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";

const ServicesViewModel = () => {
  // Sử dụng custom hook để quản lý state và logic
  const { isLoading, error, servicesData, retryFetch } = useServicesViewModel();

  // Hiển thị loading spinner khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="bg-primary sm:min-h-screen md:py-16 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Hiển thị error message nếu có lỗi
  if (error) {
    return (
      <div className="bg-primary sm:min-h-screen md:py-16 flex items-center justify-center">
        <ErrorDisplay error={error} onRetry={retryFetch} />
      </div>
    );
  }

  // Nếu không có dữ liệu, không render gì
  if (!servicesData || !servicesData.acf?.service) {
    return null;
  }

  // Lấy danh sách services từ ACF data
  const services = servicesData.acf.service;
  
  // Dữ liệu service đầu tiên là phần mô tả chính
  const mainService = services[0];
  
  // Các services còn lại là các dịch vụ cụ thể
  const specificServices = services.slice(1);

  // Fallback icons cho trường hợp không có icon từ API
  const fallbackIcons = [NotebookPen, Lightbulb, PaintRoller];

  return (
    <div className="bg-primary sm:min-h-screen md:py-16">
      <div className="w-full h-fit lg:w-10/12 xl:w-9/12 2xl:w-8/12 bg-white m-auto p-4 py-20 md:p-8 lg:p-10 grid grid-rows-1 lg:grid-rows-2 gap-8 md:gap-16 lg:gap-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {/* Phần mô tả chính */}
          <div className="max-w-2xl">
            <h4 className="mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-primary leading-tight">
              {mainService.tittle}
            </h4>
            <p className="text-third text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl ml-0 md:ml-5 leading-relaxed">
              {mainService.description}
            </p>
          </div>
          
          {/* Service đầu tiên */}
          {specificServices[0] && (
            <div className="max-w-2xl">
              <div className="mb-3 md:mb-4 lg:mb-2">
                {specificServices[0].icon ? (
                  <IconRenderer 
                    svgString={specificServices[0].icon}
                    className="md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] text-primary"
                    size={50}
                  />
                ) : (
                  <NotebookPen
                    size={50}
                    className="md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] text-primary"
                  />
                )}
              </div>
              <h4 className="mb-3 md:mb-4 lg:mb-5 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-primary leading-tight">
                {specificServices[0].tittle}
              </h4>
              <p className="text-third text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl ml-0 md:ml-5 leading-relaxed">
                {specificServices[0].description}
              </p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {/* Render các service còn lại */}
          {specificServices.slice(1).map((service, index) => {
            const FallbackIcon = fallbackIcons[index + 1] || Lightbulb;
            
            return (
              <div key={index} className="max-w-2xl">
                <div className="mb-3 md:mb-4  lg:mb-2">
                  {service.icon ? (
                    <IconRenderer 
                      svgString={service.icon}
                      className="md:w-16 md:h-16 lg:w-[70px] text-6xl  lg:h-[70px] text-primary"
                      size={50}
                    />
                  ) : (
                    <FallbackIcon
                      size={50}
                      className="md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] text-primary"
                    />
                  )}
                </div>
                <h4 className="mb-3 md:mb-4 lg:mb-5 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-primary leading-tight">
                  {service.tittle}
                </h4>
                <p className="text-third text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl ml-0 md:ml-5 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesViewModel;

import BannerViewModel from "../../viewModels/BannerViewModel/BannerViewModel";
import AboutUsViewModel from "../../viewModels/AboutUsViewModel/AboutUsViewModel";
import ProcessStepViewModel from "@viewModels/ProcessStepViewModel/ProcessStepViewModel";
import ContactViewModel from "@viewModels/ContactViewModel/ContactViewModel";
import ServiceViewModel from "@viewModels/ServiceViewModel/ServiceViewModel";
import ProjectFinalViewModel from "@viewModels/ProjectFinalViewModel/ProjectFinalViewModel";
import BlogsViewModel from "@viewModels/BlogViewModel/BlogViewModel";
import { Phone } from "lucide-react";
import ConstructionCategories from "@viewModels/ConstructionCategories/ConstructionCategories";
import QuestionViewModel from "@viewModels/QuestionViewModel/QuestionViewModel";
import FormContactViewModel from "@viewModels/FormContactViewModel/FormContactViewModel";
import { useHomePageViewModel } from "@/viewModels/HomePageViewModel";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import PartnerBrands from "@/components/PartnerBrands";
import SEOHead from "@/components/SEOHead/SEOHead";

const HomeView = () => {
  // Sử dụng ViewModel để quản lý dữ liệu trang Home
  const {
    isLoading,
    error,
    getBannerData,
    getAboutData,
    getProcessData,
    getServiceData,
    fetchHomePageData,
  } = useHomePageViewModel();

  // Lấy dữ liệu cho từng section
  const bannerData = getBannerData();
  const aboutData = getAboutData();
  const processData = getProcessData();
  const serviceData = getServiceData();
  
  // Hiển thị loading state
  if (isLoading) {
    return (
      <>
        <SEOHead
          title="Mộc Đức Furniture"
          description="Mộc Đức chuyên tư vấn, thiết kế và thi công nội thất trọn gói."
          type="website"
        />
        <LoadingSpinner />
      </>
    );
  }

  // Hiển thị error state
  if (error) {
    return (
      <>
        <SEOHead
          title="Mộc Đức Furniture"
          description="Mộc Đức chuyên tư vấn, thiết kế và thi công nội thất trọn gói."
          type="website"
        />
        <ErrorDisplay error={error} onRetry={fetchHomePageData} />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Mộc Đức Furniture"
        description="Mộc Đức chuyên tư vấn, thiết kế và thi công nội thất trọn gói."
        type="website"
      />
      <div className="w-screen overflow-x-hidden">
        {/* Banner với dữ liệu từ API */}
        <BannerViewModel
          type="home"
          showButton={true}
          title={bannerData?.title}
          subtitle={bannerData?.description}
        />

        {/* About Us section với dữ liệu từ API */}
        <AboutUsViewModel
          title={aboutData?.title}
          description={aboutData?.description}
          image={aboutData?.image}
          videoUrl={aboutData?.videoUrl?.url}
          yearsExperience={aboutData?.yearsExperience}
          projectExperience={aboutData?.projectExperience}
          customerCount={aboutData?.customerCount}
        />

        {/* Process Steps section với dữ liệu từ API */}
        <ProcessStepViewModel
          title={processData?.title}
          description={processData?.description}
          steps={processData?.steps}
        />

        <ContactViewModel
          title={"HÃY TRỞ THÀNH MỘT ĐỐI TÁC CỦA MỘC ĐỨC NGAY HÔM NAY"}
          textBtn={"Liên hệ với chúng tôi"}
          classNameBtn="tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.16em]"
        />

        {/* Service section với dữ liệu từ API */}
        <ServiceViewModel
          title={serviceData?.title}
          description={serviceData?.description}
          services={serviceData?.services}
        />

        <ProjectFinalViewModel type="home" mode="zigzag" />

        <ContactViewModel
          title={"HÃY TRỞ THÀNH MỘT ĐỐI TÁC CỦA MỘC ĐỨC NGAY HÔM NAY"}
          href="tel:0902300703"
          textBtn={
            <>
              <Phone
                size={20}
                className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 "
              />{" "}
              0905300703
            </>
          }
          classNameBtn="flex justify-center items-center tracking-[2px] sm:tracking-[3px] md:tracking-[4px] lg:tracking-[6px] gap-2 sm:gap-3 font-black"
        />

        <BlogsViewModel limit={3} />
        <PartnerBrands />

        <ConstructionCategories />
        <QuestionViewModel />
        <FormContactViewModel />
      </div>
    </>
  );
};

export default HomeView;

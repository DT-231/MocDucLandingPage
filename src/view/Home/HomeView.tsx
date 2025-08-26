import BannerViewModel from "../../viewModels/BannerViewModel/BannerViewModel";
import AboutUsViewModel from "../../viewModels/AboutUsViewModel/AboutUsViewModel";
import ProcessStepViewModel from "@viewModels/ProcessStepViewModel/ProcessStepViewModel";
import ContactViewModel from "@/viewModels/ContactViewModel/ContactViewModel";
import ServiceViewModel from "@/viewModels/ServiceViewModel/ServiceViewModel";
import ProjectFinalViewModel from "@/viewModels/ProjectFinalViewModel/ProjectFinalViewModel";
import NewsViewModel from "@/viewModels/NewsViewModel/NewsViewModel";
import { Phone } from "lucide-react";
import ConstructionCategories from "@/viewModels/ConstructionCategories/ConstructionCategories";
import QuestionViewModel from "@/viewModels/QuestionViewModel/QuestionViewModel";
import FormContactViewModel from "@/viewModels/FormContactViewModel/FormContactViewModel";

const HomeView = () => {
  return (
    <div className="w-screen overflow-x-hidden">
      <BannerViewModel type="home" showButton={true} />
      <AboutUsViewModel />
      <ProcessStepViewModel />
      <ContactViewModel
        title={"HÃY TRỞ THÀNH MỘT ĐỐI TÁC CỦA MỘC ĐỨC NGAY HÔM NAY"}
        textBtn={"Liên hệ với chúng tôi"}
        classNameBtn="tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.16em]"
      />
      <ServiceViewModel />
      <ProjectFinalViewModel type="home" mode="zigzag"/>
      <ContactViewModel
        title={"HÃY TRỞ THÀNH MỘT ĐỐI TÁC CỦA MỘC ĐỨC NGAY HÔM NAY"}
        href="tel:0902300703"
        textBtn={
          <>
            <Phone size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" /> 0902300703
          </>
        }
        classNameBtn="flex justify-center items-center tracking-[2px] sm:tracking-[3px] md:tracking-[4px] lg:tracking-[6px] gap-2 sm:gap-3"
      />
      <NewsViewModel limit={3} />
      <ConstructionCategories />
      <QuestionViewModel />
      <FormContactViewModel/>
    </div>
  );
};

export default HomeView;

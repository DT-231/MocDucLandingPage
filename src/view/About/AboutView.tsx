import AboutUsHistory from "@/viewModels/AboutUsHistory/AboutUsHistory";
import BannerViewModel from "../../viewModels/BannerViewModel/BannerViewModel";
import ProcessStepViewModel from "@/viewModels/ProcessStepViewModel/ProcessStepViewModel";
import ContactViewModel from "@/viewModels/ContactViewModel/ContactViewModel";
import { Phone } from "lucide-react";
import QuestionViewModel from "@/viewModels/QuestionViewModel/QuestionViewModel";
import FormContactViewModel from "@/viewModels/FormContactViewModel/FormContactViewModel";

const AboutView = () => {
  return (
    <div className="w-screen min-h-screen bg-white">
      <BannerViewModel type="other" title="VỀ CHÚNG TÔI" subtitle="TRANG  / VỀ CHÚNG TÔI" />
      <AboutUsHistory />
      <ProcessStepViewModel />
      <ContactViewModel
        title={"HÃY TRỞ THÀNH MỘT ĐỐI TÁC CỦA MỘC ĐỨC NGAY HÔM NAY"}
        href="tel:0902300703"
        textBtn={
          <>
            <Phone size={24} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" /> 
            <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">0902300703</span>
          </>
        }
        classNameBtn="flex justify-center items-center tracking-[2px] sm:tracking-[4px] md:tracking-[6px] gap-2 sm:gap-3 flex-wrap"
      />

      <QuestionViewModel />
      <FormContactViewModel/>
      
    </div>
  );
};

export default AboutView;

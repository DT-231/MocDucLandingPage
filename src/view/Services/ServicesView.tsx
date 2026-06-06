import BannerViewModel from "@/viewModels/BannerViewModel/BannerViewModel";
import ContactViewModel from "@/viewModels/ContactViewModel/ContactViewModel";
import FormContactViewModel from "@/viewModels/FormContactViewModel/FormContactViewModel";
import ProcessStepViewModel from "@/viewModels/ProcessStepViewModel/ProcessStepViewModel";
import QuestionViewModel from "@/viewModels/QuestionViewModel/QuestionViewModel";
import ServicesViewModel from "@/viewModels/ServicesViewModel/ServicesViewModel";
import { Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead/SEOHead";

const ServicesView = () => {
  return (
    <>
      <SEOHead
        title="Dịch vụ"
        description="Dịch vụ tư vấn, thiết kế và thi công nội thất trọn gói của Mộc Đức."
        type="website"
      />
      <div className="w-screen">
        <BannerViewModel
          type="other"
          title="DỊCH VỤ"
          subtitle="TRANG CHỦ / DỊCH VỤ"
        />
        <ServicesViewModel />
        <ProcessStepViewModel />
        <ContactViewModel
          title={"HÃY TRỞ THÀNH MỘT ĐỐI TÁC CỦA MỘC ĐỨC NGAY HÔM NAY"}
          href="tel:0902300703"
          textBtn={
            <>
              <Phone size={30} /> 0902300703
            </>
          }
          classNameBtn="flex justify-center items-center tracking-[6px] gap-3"
        />
        <QuestionViewModel />
        <FormContactViewModel />
      </div>
    </>
  );
};

export default ServicesView;

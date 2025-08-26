import BannerViewModel from "@/viewModels/BannerViewModel/BannerViewModel";
import NewsListViewModel from "@/viewModels/NewsListViewModel/NewsListViewModel";
import ContactViewModel from "@/viewModels/ContactViewModel/ContactViewModel";
import FormContactViewModel from "@/viewModels/FormContactViewModel/FormContactViewModel";
import QuestionViewModel from "@/viewModels/QuestionViewModel/QuestionViewModel";
import { Phone } from "lucide-react";

const NewsView = () => {
  return (
    <div className="min-w-screen">
      <BannerViewModel
        type="other"
        title="TIN TỨC"
        subtitle="TRANG CHỦ / TIN TỨC"
      />
      <NewsListViewModel />
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
  );
};

export default NewsView;

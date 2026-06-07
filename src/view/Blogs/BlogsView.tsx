import { useSearchParams } from 'react-router-dom';
import BannerViewModel from "@/viewModels/BannerViewModel/BannerViewModel";
import SEOHead from "@/components/SEOHead/SEOHead";
import BlogsListViewModel from "@/viewModels/BlogsListViewModel/BlogsListViewModel";
import BlogsWithSearchView from "@/components/BlogsWithSearch/BlogsWithSearchView";
import ContactViewModel from "@/viewModels/ContactViewModel/ContactViewModel";
import FormContactViewModel from "@/viewModels/FormContactViewModel/FormContactViewModel";
import QuestionViewModel from "@/viewModels/QuestionViewModel/QuestionViewModel";
import { Phone } from "lucide-react";

const BlogsView = () => {
  const [searchParams] = useSearchParams();
  const hasSearch = searchParams.has('search') || searchParams.has('page');

  return (
    <>
      <SEOHead
        title="Tin tức"
        description="Tin tức, kinh nghiệm và kiến thức về thiết kế thi công nội thất."
        type="website"
      />
      <div className="min-w-screen">
        <BannerViewModel
          type="other"
          title="TIN TỨC"
          subtitle="TRANG CHỦ / TIN TỨC"
        />

        {/* Hiển thị component khác nhau tùy theo có search/pagination hay không */}
        {hasSearch ? <BlogsWithSearchView /> : <BlogsListViewModel />}

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

export default BlogsView;

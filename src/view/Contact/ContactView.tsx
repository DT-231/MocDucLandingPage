import BannerViewModel from "@/viewModels/BannerViewModel/BannerViewModel";
import SEOHead from "@/components/SEOHead/SEOHead";
import FormContactViewModel from "@/viewModels/FormContactViewModel/FormContactViewModel";

const ContactView = () => {
  return (
    <>
      <SEOHead
        title="Liên hệ"
        description="Liên hệ Mộc Đức để được tư vấn thiết kế và thi công nội thất."
        type="website"
      />
      <div className="w-screen">
        <BannerViewModel
          type="other"
          title="LIÊN HỆ"
          subtitle="TRANG CHỦ / LIÊN HỆ"
        />
        <FormContactViewModel isContactPage={true} />
      </div>
    </>
  );
};

export default ContactView;

import BannerViewModel from "@/viewModels/BannerViewModel/BannerViewModel";
import FormContactViewModel from "@/viewModels/FormContactViewModel/FormContactViewModel";

const ContactView = () => {
  return (
    <div className="w-screen">
      <BannerViewModel type="other" title="LIÊN HỆ" subtitle="TRANG CHỦ / LIÊN HỆ" />
      <FormContactViewModel isContactPage={true}/>

    </div>
  );
};

export default ContactView;

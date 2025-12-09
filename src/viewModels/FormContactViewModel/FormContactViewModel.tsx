import Images from "@assets/Images";
import { Mail, MapPin, Phone, SendHorizontal } from "lucide-react";
import { useState } from "react";
import type { FormContactViewModelProps } from "@/models/FormContactViewModelType/FormContactViewModelType";
import { useContactForm } from "@/viewModels/hooks/useContactForm";
import { FormInput, FormTextArea } from "@/components/FormInput/FormInput";
import FormNotification from "@/components/FormNotification/FormNotification";
import { useCompanyData } from "@viewModels/hooks/useWordPressData";

const FormContactViewModel: React.FC<FormContactViewModelProps> = ({
  isContactPage = false,
  className = "",
}) => {
  const { companyData } = useCompanyData();
  // Sử dụng custom hook để quản lý form logic
  const { formState, handleInputChange, handleFieldBlur, handleSubmit } =
    useContactForm();

  // State để quản lý thông báo
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    isVisible: boolean;
  }>({
    type: "success",
    message: "",
    isVisible: false,
  });

  // Xử lý submit form với callback
  const onSubmitHandler = (e: React.FormEvent) => {
    handleSubmit(
      e,
      // Callback khi thành công
      (message: string) => {
        setNotification({
          type: "success",
          message,
          isVisible: true,
        });
        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => {
          setNotification((prev) => ({ ...prev, isVisible: false }));
        }, 5000);
      },
      // Callback khi có lỗi
      (message: string) => {
        setNotification({
          type: "error",
          message,
          isVisible: true,
        });
        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => {
          setNotification((prev) => ({ ...prev, isVisible: false }));
        }, 5000);
      }
    );
  };

  return (
    <div
      className={`py-8 sm:py-12 md:py-16 relative overflow-hidden font-primary ${className} ${
        isContactPage
          ? "bg-[#fefffa]"
          : "bg-[linear-gradient(0deg,rgba(255,255,255,0.71)_0%,#9F8467_100%)]"
      }`}
    >
      {/* Background Pattern/Image - Only show on desktop */}
      <div
        className={`absolute inset-0 opacity-10 hidden lg:${
          isContactPage ? "hidden" : "block"
        } `}
      >
        <img
          src={Images.bannerHomeImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
          {/* Left Side - Contact Information - Hidden on mobile */}
          <div
            className={`text-primary ${
              !isContactPage && "lg:text-second"
            } text-center lg:text-left`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              LIÊN HỆ VỚI CHÚNG TÔI
            </h2>
            <p
              className={`text-base ${
                isContactPage ? "text-primary" : "text-second"
              }  sm:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed`}
            >
              Mộc Đức cung cấp sản phẩm và dịch vụ chất lượng cao và đáng tin
              cậy
            </p>

            {/* Hotline */}
            <div className="mb-6 sm:mb-8 hidden lg:block">
              <div className="inline-flex flex-col sm:flex-row items-start sm:items-center backdrop-blur-sm rounded-full py-3">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold mr-0 sm:mr-4 mb-3 sm:mb-0">
                  Hotline
                </span>
                <div className="flex gap-2 sm:gap-4 items-center bg-primary rounded-full px-2 py-2 pr-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-second border-1 flex items-center justify-center">
                    <Phone
                      size={20}
                      className={`sm:w-6 sm:h-6 ${
                        isContactPage && "text-second"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-lg sm:text-xl md:text-2xl font-semibold ${
                      isContactPage && "text-second"
                    }`}
                  >
                    {companyData?.phone || "0905 300 703"}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 sm:space-y-6 hidden lg:block">
              {/* Address */}
              <div className="flex items-start sm:items-center">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-second rounded-full flex items-center justify-center mr-3 sm:mr-4 text-primary mt-1 sm:mt-0">
                  <MapPin size={20} className="sm:w-6 sm:h-6 " />
                </div>
                <div>
                  <p className="text-base sm:text-lg md:text-xl font-medium">
                    {companyData?.address ||
                      "84 86 Đ. Nguyễn Công Triều, An Khê, TP. Đà Nẵng"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="items-center hidden lg:flex">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-second rounded-full flex items-center justify-center mr-3 sm:mr-4 text-primary">
                  <Phone size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-base sm:text-lg md:text-xl font-medium">
                    {companyData?.phone || "0905 300 703"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className=" items-center hidden lg:flex">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-second rounded-full flex items-center justify-center mr-3 sm:mr-4 text-primary">
                  <Mail />
                </div>
                <div>
                  <p className="text-base sm:text-lg md:text-xl font-medium break-all">
                    {companyData?.email || "info@mocduc.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full lg:w-auto"
            style={{
              boxShadow: "0px 12px 20px 0px #00000040",
            }}
          >
            {/* Mobile title - only show on mobile */}
            <div className="lg:hidden mb-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                LIÊN HỆ VỚI CHÚNG TÔI
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Mộc Đức cung cấp sản phẩm và dịch vụ chất lượng cao
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-4 sm:space-y-6">
              {/* Hiển thị thông báo */}
              <FormNotification
                type={notification.type}
                message={notification.message}
                isVisible={notification.isVisible}
                onClose={() =>
                  setNotification((prev) => ({ ...prev, isVisible: false }))
                }
              />

              {/* Name and Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Họ và Tên"
                  value={formState.data.name}
                  error={formState.errors.name}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  required
                />
                <FormInput
                  type="tel"
                  name="phone"
                  placeholder="Điện Thoại"
                  value={formState.data.phone}
                  error={formState.errors.phone}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  required
                />
              </div>

              {/* Email */}
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={formState.data.email}
                error={formState.errors.email}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                required
              />

              {/* Subject */}
              <FormInput
                type="text"
                name="subject"
                placeholder="Tiêu Đề"
                value={formState.data.subject}
                error={formState.errors.subject}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                required
              />

              {/* Content */}
              <FormTextArea
                name="content"
                placeholder="Nội Dung"
                value={formState.data.content}
                error={formState.errors.content}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                rows={4}
                required
              />

              {/* Submit Button */}
              <div className="flex justify-center items-center pt-2">
                <button
                  type="submit"
                  disabled={formState.isLoading || formState.isSubmitted}
                  className={`
                    inline-flex border-1 border-primary items-center gap-2 
                    px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold 
                    rounded-lg transition-all duration-300 
                    ${
                      formState.isLoading || formState.isSubmitted
                        ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-500"
                        : "text-primary hover:shadow-lg hover:bg-primary hover:text-white"
                    }
                  `}
                >
                  <span>
                    {formState.isLoading
                      ? "Đang gửi..."
                      : formState.isSubmitted
                      ? "Đã gửi!"
                      : "Gửi"}
                  </span>
                  <SendHorizontal size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContactViewModel;

import Images from "@assets/Images";
import { MapPin, Phone, SendHorizontal } from "lucide-react";
import { useState } from "react";
import type {
  FormContactViewModelProps,
  FormContactData,
} from "@/models/FormContactViewModelType/FormContactViewModelType";

const FormContactViewModel: React.FC<FormContactViewModelProps> = ({
  isContactPage = false,
  className = "",
}) => {
  const [formData, setFormData] = useState<FormContactData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    content: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
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
            <p className={`text-base ${isContactPage  ? 'text-primary': 'text-second'}  sm:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed`}>
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
                    0905 300 703
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
                    84 86 Đ. Nguyễn Công Triều, An Khê, TP. Đà Nẵng
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
                    0905 300 703
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className=" items-center hidden lg:flex">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-second rounded-full flex items-center justify-center mr-3 sm:mr-4 text-primary">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-base sm:text-lg md:text-xl font-medium break-all">
                    hoang2312004@gmail.com
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

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name and Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Họ và Tên"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border bg-[#f6f6f6] border-gray-200 rounded-2xl sm:rounded-4xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 placeholder-gray-500 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Điện Thoại"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border bg-[#f6f6f6] border-gray-200 rounded-2xl sm:rounded-4xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 placeholder-gray-500 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border bg-[#f6f6f6] border-gray-200 rounded-2xl sm:rounded-4xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 placeholder-gray-500 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Tiêu Đề"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border bg-[#f6f6f6] border-gray-200 rounded-2xl sm:rounded-4xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 placeholder-gray-500 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <textarea
                  name="content"
                  placeholder="Nội Dung"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border bg-[#f6f6f6] border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 placeholder-gray-500 resize-vertical text-sm sm:text-base"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center items-center pt-2">
                <button
                  type="submit"
                  className="inline-flex border-1 border-primary text-primary items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold rounded-lg transition-all duration-300 hover:shadow-lg group hover:bg-primary hover:text-white"
                >
                  <span>Gửi</span>
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

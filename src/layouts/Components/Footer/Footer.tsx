import { FaFacebook, FaTiktok } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { useCompanyData } from "@viewModels/hooks/useWordPressData";
import { Link } from "react-router-dom";

const Footer = () => {
  // Lấy dữ liệu công ty từ WordPress Customizer
  const { companyData } = useCompanyData();
  
  const companyName = companyData?.name || 'CÔNG TY TNHH TƯ VẤN THIẾT KẾ THI CÔNG NỘI THẤT MỘC ĐỨC';
  const companyPhone = companyData?.phone || '0905 300 703';
  const companyEmail = companyData?.email || 'info@mocduc.com';
  const companyAddress = companyData?.address || '84-86 Đ. Nguyên Công Trứ, An Khê, TP. Đà Nẵng';
  const companyFacebook = companyData?.facebook || 'https://facebook.com/mocduc';
  const companyTiktok = companyData?.tiktok || 'https://tiktok.com/@mocduc';
  const companyZalo = companyData?.zalo || 'https://zalo.me/0905300703';

  return (
    <footer className="bg-[#FEFFFA] py-8 md:py-12 border-t border-gray-200">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Name */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-2 text-center md:text-left">
            {companyName}
          </h2>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        {/* Footer Content - Chia thành 4 cột như trong ảnh */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Thông tin liên hệ
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2 flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {companyAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <a
                  href={`tel:${companyPhone.replace(/\s/g, '')}`}
                  className="text-sm md:text-base text-gray-600 hover:text-primary transition-colors"
                >
                  {companyPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-primary"
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
                <a
                  href={`mailto:${companyEmail}`}
                  className="text-sm md:text-base text-gray-600 hover:text-primary transition-colors"
                >
                  {companyEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Liên kết nhanh
            </h3>
            <div className="space-y-2 md:space-y-3">
              <Link
                to={"/about-us"}
                className="block text-sm md:text-base text-gray-600 hover:text-primary transition-colors"
              >
                Giới thiệu
              </Link>
              <Link
                to="/projects"
                className="block text-sm md:text-base text-gray-600 hover:text-primary transition-colors"
              >
                Sản phẩm
              </Link>
              <a
                href="#"
                className="block text-sm md:text-base text-gray-600 hover:text-primary transition-colors"
              >
                Đối Tác và Hợp Tác
              </a>
              <a
                href="#"
                className="block text-sm md:text-base text-gray-600 hover:text-primary transition-colors"
              >
                Câu hỏi thường gặp
              </a>
              <Link 
                to={"/blogs"}
                className="block text-sm md:text-base text-gray-600 hover:text-primary transition-colors"
              >
                Tin tức
              </Link  >
              <Link
                to={"/contact"}
                className="block text-sm md:text-base text-gray-600 hover:text-primary transition-colors"
              >
                Liên hệ
              </Link>
            </div>
          </div>

          {/* Bản đồ Google */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Bản đồ Google
            </h3>
            <div className="space-y-3 md:space-y-4"> 
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4912.84980333568!2d108.17644887609859!3d16.043713884632158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421995b1886ee5%3A0x8ed18932dfc7e66f!2zVGhp4bq_dCBL4bq_IC0gVGhpIEPDdG5nIE7hu5lpIFRo4bqldCBN4buZYyDEkOG7qWMgxJDDoCBO4bq1bmc!5e1!3m2!1svi!2s!4v1757172274498!5m2!1svi!2s"
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Đăng ký thông báo
            </h3>
            <p className="text-gray-600 mb-4 text-xs md:text-sm leading-relaxed">
              Nhập Email của bạn để nhận thông báo sớm nhất của chúng tôi
            </p>
            <div className="space-y-4 md:space-y-6">
              <div className="flex ">
                <input
                  id="email"
                  type="email"
                  placeholder="Nhập Email của bạn"
                  className="flex-1 px-3 py-2 border-2 border-r-0 rounded-l-3xl border-primary   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs md:text-sm"
                />
                <button className="bg-primary hover:bg-primary/80 text-white px-2 py-2 rounded-r-3xl transition-colors text-xs md:text-sm whitespace-nowrap">
                  Đăng Ký
                </button>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-3">
                <a
                  href={companyFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary w-8 h-8 md:w-10 md:h-10 flex items-center text-lg md:text-xl justify-center text-white rounded-full hover:bg-primary/80 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href={companyTiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary w-8 h-8 md:w-10 md:h-10 text-white text-lg md:text-xl flex items-center justify-center rounded-full hover:bg-primary/80 transition-colors"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
                <a
                  href={companyZalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary w-8 h-8 md:w-10 md:h-10 text-white flex items-center justify-center text-lg md:text-xl rounded-full hover:bg-primary/80 transition-colors"
                  aria-label="Zalo"
                >
                  <SiZalo />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-300 my-8 md:my-12"></div>

        {/* Bottom Copyright */}
        <div className="text-center">
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed px-2">
            © 2024 {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

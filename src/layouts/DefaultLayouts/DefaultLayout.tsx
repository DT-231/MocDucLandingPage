import { useEffect } from "react";
import { useScrollToTop } from "../../utils/useScrollToTop";
import Header from "../Components/Header/Header";
import request from "@/configs/axios";
import Footer from "../Components/Footer/Footer";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { useScrollToTopViewModel } from "@/viewModels/ScrollToTopViewModel";

// 📌 Layout chung cho các trang
// - Nhận `children` là JSX (React.ReactNode) để bao bọc nội dung từng trang.
// - Dùng khi muốn giữ nguyên nội dung truyền vào (header, footer, main content...).
const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useScrollToTop(); // 📌 Gọi custom hook để tự scroll lên đầu trang khi route đổi

  // ViewModel để quản lý scroll to top button
  const { isVisible, scrollToTop } = useScrollToTopViewModel();

  useEffect(()=>{
    const fetch = async ()=>{
      let res = request.get(`/wp-json/wp/v2/pages?slug=home`)

      console.log(res);
      
    }
    fetch()
  },[])

  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="content">{children}</div>
      </div>
      <Footer />
      
      {/* Scroll to top button - hiển thị khi scroll xuống */}
      <ScrollToTopButton 
        isVisible={isVisible} 
        onClick={scrollToTop} 
      />
    </div>
  );
};

export default DefaultLayout;

import { useScrollToTop } from "../../utils/useScrollToTop";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

// 📌 Layout chung cho các trang
// - Nhận `children` là JSX (React.ReactNode) để bao bọc nội dung từng trang.
// - Dùng khi muốn giữ nguyên nội dung truyền vào (header, footer, main content...).
const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useScrollToTop(); // 📌 Gọi custom hook để tự scroll lên đầu trang khi route đổi
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

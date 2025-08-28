const ProcessStepViewModel = () => {
  return (
    <section className="process-section py-8 sm:py-12 md:py-16 bg-[#F6FBF6] font-primary">
      <div className="container max-w-[1200px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl  font-extrabold text-primary mb-4">
            QUY TRÌNH LÀM VIỆC
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-third max-w-7xl mx-auto font-extralight leading-[117%] tracking-[6%] px-4">
            Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh vực
            thi công và thiết kế nội thất.
            <br className="hidden sm:block" />
            Tự tin là đối tác đáng tin cậy trong các lĩnh vực sau.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Step 1 */}
          <div className="process-step">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
              01. Khảo sát & Tư vấn
            </h3>
            <p className="text-third font-normal text-sm sm:text-base md:text-lg lg:text-xl leading-[117%] tracking-[6%] text-justify">
              Chúng tôi lắng nghe nhu cầu, phong cách và ngân sách của bạn. Sau
              đó, đội ngũ kỹ thuật sẽ tiến hành khảo sát mặt bằng để tư vấn giải
              pháp phù hợp nhất.
            </p>
          </div>

          {/* Step 2 */}
          <div className="process-step">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
              02. Thiết kế & Chọn màu
            </h3>
            <p className="text-third text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[117%] tracking-[6%] text-justify">
              Dựa trên thông tin đã thu thập, đội ngũ thiết kế của Mộc Đức sẽ
              xây dựng concept không gian, phối cảnh 3D, bản vẽ kỹ thuật - đảm
              bảo tính thẩm mỹ và công năng.
            </p>
          </div>

          {/* Step 3 */}
          <div className="process-step">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
              03. Thi công & Lắp đặt
            </h3>
            <p className="text-third text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[117%] tracking-[6%] text-justify">
              Đội ngũ thi công tiến hành sản xuất, lắp đặt nội thất theo đúng
              màu đã chọn. Toàn bộ quy trình được giám sát kỹ lưỡng để đảm bảo
              chất lượng, đúng tiến độ và thẩm mỹ.
            </p>
          </div>

          {/* Step 4 */}
          <div className="process-step">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
              04. Bàn giao & Bảo hành
            </h3>
            <p className="text-third text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[117%] tracking-[6%] text-justify">
              Sau khi hoàn thiện, công trình được nghiệm thu và bàn giao. Mộc
              Đức cam kết bảo hành rõ ràng từng hạng mục nội thất trong thời
              gian sử dụng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessStepViewModel;

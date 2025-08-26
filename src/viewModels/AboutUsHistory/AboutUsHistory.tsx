import Images from "@/assets/Images";

const AboutUsHistory = () => {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 bg-gray-50 min-h-fit">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-20 my-6 sm:my-8 lg:my-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="order-1 lg:order-1 space-y-4 sm:space-y-6 my-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-wide text-center lg:text-left">
              Lịch Sử Hình Thành
            </h2>
            <div className="space-y-3 sm:space-y-4 text-third text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide leading-relaxed">
              <p>
                It dolor sit, amet consectetur adipisicing elit. Hic neque
                iusto, inventore consequatur voluptates iste ex nesciunt illum
                doloremque adipisci laborum consequuntur repellat odio eaque
                vero voluptate modi assumenda? Laborum quo asperiores et ad.
                Numquam, accusamus? Qui veritatis ipsam explicabo natus
                voluptates minus? Mollitia, obcaecati delentit. Expedita quis ut
                porro incidunt officia doloremque repellendus libero veniam et,
                architecto ea consequuntur labore dicta? Tempora labore hic
                necessitatibus porro, exercitationem, saepe sit suscipit
                assumenda pariatur nisl placeat. Magnam molestias ea dicta
                excepturi, sequi quaerat fuga ducimus deserunt.
              </p>
            </div>
          </div>

          {/* Images Section */}
          <div className="order-2 lg:order-2 relative flex justify-center h-[700px] md:h-[1000px]">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[400px] sm:h-[500px] md:h-[600px]">
              {/* Main Background Image */}
              <div className="absolute top-0 left-0 w-full  sm:h-[65%] md:h-[700px] z-10">
                <img
                  src={Images.aboutUsDownImage}
                  alt="About Us Background"
                  className="w-full h-full object-cover "
                />
              </div>

              {/* Overlapping Image (đè lên 1/3 ảnh Down) */}
              <div className="absolute top-[35%] sm:top-[40%] md:top-[400px] right-0 w-full  sm:h-[50%] md:h-[700px] translate-x-[15%] sm:translate-x-[20%] md:translate-x-[50%] shadow-lg z-20">
                <img
                  src={Images.aboutUsUpImage}
                  alt="About Us Overlay"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHistory;

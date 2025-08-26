import { Lightbulb, NotebookPen, PaintRoller } from "lucide-react";

const ServicesViewModel = () => {
  return (
    <div className="bg-primary sm:min-h-screen md:py-16">
      <div className="w-full h-fit lg:w-10/12 xl:w-9/12 2xl:w-8/12  bg-white m-auto p-4 py-20 md:p-8 lg:p-10 grid grid-rows-1 lg:grid-rows-2 gap-8 md:gap-16 lg:gap-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          <div className="max-w-2xl">
            <h4 className="mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-primary leading-tight">
              CHÚNG TÔI CUNG CẤP DỊCH VỤ NỘI THẤT TỐT NHẤT
            </h4>
            <p className="text-third text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl ml-0 md:ml-5 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
              neque iusto, inventore consequatur voluptates iste ex nesciunt
              illum doloremque adipisci laborum consequuntur repellat odio eaque
              vero voluptate modi assumenda? Laborum quo asperiores et ad.
            </p>
          </div>
          <div className="max-w-2xl">
            <div className="mb-3 md:mb-4 lg:mb-2">
              <NotebookPen
                size={50}
                className="md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] text-primary"
              />
            </div>
            <h4 className="mb-3 md:mb-4 lg:mb-5 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-primary leading-tight">
              THIẾT KẾ TRỌN GÓI
            </h4>
            <p className="text-third text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl ml-0 md:ml-5 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
              neque iusto, inventore consequatur voluptates iste ex nesciunt
              illum doloremque adipisci laborum consequuntur repellat odio eaque
              vero
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          <div className="max-w-2xl">
            <div className="mb-3 md:mb-4 lg:mb-2">
              <Lightbulb
                size={50}
                className="md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] text-primary"
              />
            </div>
            <h4 className="mb-3 md:mb-4 lg:mb-5 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-primary leading-tight">
              GIẢI PHÁP CẢI TẠO
            </h4>
            <p className="text-third text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl ml-0 md:ml-5 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
              neque iusto, inventore consequatur voluptates iste ex nesciunt
              illum doloremque adipisci laborum consequuntur repellat odio eaque
              vero
            </p>
          </div>
          <div className="max-w-2xl">
            <div className="mb-3 md:mb-4 lg:mb-2">
              <PaintRoller
                size={50}
                className="md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] text-primary"
              />
            </div>
            <h4 className="mb-3 md:mb-4 lg:mb-5 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-primary leading-tight">
              NỘI THẤT & TRANG TRÍ
            </h4>
            <p className="text-third text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl ml-0 md:ml-5 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
              neque iusto, inventore consequatur voluptates iste ex nesciunt
              illum doloremque adipisci laborum consequuntur repellat odio eaque
              vero
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesViewModel;

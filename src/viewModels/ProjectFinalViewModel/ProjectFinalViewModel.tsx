import { useState, useEffect } from "react";
import ProjectCard from "../../components/ProjectCard";

interface ProjectFinalViewModelProps {
  type: "home" | "other";
  mode: "zigzag" | "gallery";
}

const ProjectFinalViewModel = ({ type, mode }: ProjectFinalViewModelProps) => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  return (
    <div className="bg-[#f6fbf7]">
      <div className="2xl:max-w-[1400px] xl:max-w-7xl font-primary mx-auto py-6 sm:py-8 md:py-10 px-4">
        {type == "home" ? (
          <div className="text-center py-6 md:py-10 px-4">
            <h5 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary">
              DỰ ÁN ĐÃ HOÀN THIỆN
            </h5>
            <p className="font-extralight text-base sm:text-lg md:text-xl lg:text-2xl text-third mt-4">
              Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh
              vực thi công và thiết kế nội thất.
              <br className="hidden sm:block" /> Tự tin là đối tác đáng tin cậy trong các lĩnh vực sau.
            </p>
          </div>
        ) : type == "other" ? (
          <div>
           

            {/* Filter Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex  bg-transparent">
                {["ALL", "NHÀ PHỐ", "SANG TRỌNG", "HIỆN ĐẠI", "CỔ ĐIỂN"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-2 text-nowrap  py-2 text-sm lg:text-lg lg:px-5 transition-all duration-300 relative ${
                      activeFilter === filter
                        ? "text-primary"
                        : "text-gray-600 hover:text-primary"
                    }`}
                  >
                    {filter}
                    {activeFilter === filter && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mx-auto justify-center justify-items-center">
              <ProjectCard
                imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
                title="THIẾT KẾ SANG TRỌNG"
                layout="gallery"
                showRightButton={false}
              />

              <ProjectCard
                imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
                title="THIẾT KẾ ẤM CÚNG"
                layout="gallery"
                showRightButton={false}
              />

              <ProjectCard
                imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
                title="THIẾT KẾ TỐI GIẢN"
                layout="gallery"
                showRightButton={false}
              />

              <ProjectCard
                imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
                title="THIẾT KẾ TRANG TRÍ"
                layout="gallery"
                showRightButton={false}
              />

              <ProjectCard
                imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
                title="THIẾT KẾ HIỆN ĐẠI"
                layout="gallery"
                showRightButton={false}
              />

              <ProjectCard
                imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
                title="THIẾT KẾ CỔ ĐIỂN"
                layout="gallery"
                showRightButton={false}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {mode === "zigzag" && (
          <div className="grid justify-self-center grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 px-4">
            <ProjectCard
              imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
              title="THIẾT KẾ SANG TRỌNG"
              layout="image-caption"
              className="mb-0 md:mb-80 max-w-[300px] md:max-w-none mx-auto"
              showRightButton={!isMobile}
              onRightClick={() => console.log("Right button clicked")}
            />

            <ProjectCard
              imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
              title="THIẾT KẾ ẤM CÚNG"
              layout="caption-image"
              showLeftButton={!isMobile}
              className="mt-0 md:mt-100 max-w-[300px] md:max-w-none mx-auto"
              onLeftClick={() => console.log("Left button clicked")}
            />

            <ProjectCard
              imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
              title="THIẾT KẾ TỐI GIẢN"
              layout="image-caption"
              showRightButton={!isMobile}
              className="mb-0 md:mb-80 max-w-[300px] md:max-w-none mx-auto"
              onRightClick={() => console.log("Right button clicked")}
            />
          </div>
        )}

        {mode === "gallery" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mx-auto justify-center justify-items-center">
            <ProjectCard
              imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
              title="THIẾT KẾ SANG TRỌNG"
              showRightButton={false}
            />

            <ProjectCard
              imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
              title="THIẾT KẾ ẤM CÚNG"
              showRightButton={false}
            />

            <ProjectCard
              imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
              title="THIẾT KẾ TỐI GIẢN"
              showRightButton={false}
            />

            <ProjectCard
              imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
              title="THIẾT KẾ TRANG TRÍ"
              showRightButton={false}
            />

            <ProjectCard
              imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
              title="THIẾT KẾ TỐI GIẢN"
              showRightButton={false}
            />

            <ProjectCard
              imageUrl="https://html.geekcodelab.com/decore/Multiple_Pages/assets/images/blog-single-2.jpg"
              title="THIẾT KẾ TRANG TRÍ"
              showRightButton={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFinalViewModel;

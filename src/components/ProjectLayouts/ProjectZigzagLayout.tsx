import { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard";
import type { Project } from "@/models/ProjectType";

// Interface định nghĩa props cho ProjectZigzagLayout
interface ProjectZigzagLayoutProps {
  projects?: Project[];
}

/**
 * Component hiển thị dự án theo layout zigzag (xen kẽ trái phải)
 * Đầu vào: projects - danh sách project để hiển thị
 * Đầu ra: JSX hiển thị các project card xen kẽ trái phải
 */
const ProjectZigzagLayout: React.FC<ProjectZigzagLayoutProps> = ({ projects = [] }) => {
  // State để kiểm tra thiết bị mobile
  const [isMobile, setIsMobile] = useState(false);

  // Effect để theo dõi kích thước màn hình và xác định thiết bị mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Dữ liệu mẫu cho các dự án nếu không có props


  // Sử dụng projects từ props hoặc dữ liệu mẫu
  console.log(projects);
  
  return (
    <div className="grid justify-self-center grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 px-4">
      {projects.length > 0 && projects.map((project, index) => {
        // Xác định layout xen kẽ cho zigzag
        const isEven = index % 2 === 0;
        const layout = isEven ? "image-caption" : "caption-image";
        const className = isEven 
          ? "mb-0 md:mb-80 max-w-[300px] md:max-w-none mx-auto"
          : "mt-0 md:mt-100 max-w-[300px] md:max-w-none mx-auto";
        
        return (
          <ProjectCard
            key={project.id}
            imageUrl={project.image}
            id={project.id}
            slug={project.slug}
            title={project.title}
            layout={layout}
            className={className}
            showRightButton={isEven && !isMobile}
            showLeftButton={!isEven && !isMobile}
            onRightClick={() => console.log("Right button clicked for", project.title)}
            onLeftClick={() => console.log("Left button clicked for", project.title)}
          />
        );
      })}
    </div>
  );
};

export default ProjectZigzagLayout;

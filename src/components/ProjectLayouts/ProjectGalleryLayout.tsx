import ProjectCard from "../ProjectCard";
import type { Project } from "@/models/ProjectType";

// Interface định nghĩa props cho ProjectGalleryLayout
interface ProjectGalleryLayoutProps {
  projects?: Project[];
}

/**
 * Component hiển thị dự án theo layout gallery (lưới đều nhau)
 * Đầu vào: projects - danh sách project để hiển thị
 * Đầu ra: JSX hiển thị các project card theo dạng lưới
 */
const ProjectGalleryLayout: React.FC<ProjectGalleryLayoutProps> = ({
  projects = [],
}) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mx-auto justify-center justify-items-center">
      {projects.length > 0 && projects.map((project) => (
        <ProjectCard
          key={project.id}
          imageUrl={project.image}
          title={project.title}
          showRightButton={false}
          // Thêm slug và id nếu có từ API data
          slug={(project as any).slug}
          id={(project as any).originalId}
        />
      ))}
    </div>
  );
};

export default ProjectGalleryLayout;

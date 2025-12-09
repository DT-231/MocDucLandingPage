
import { ProjectZigzagLayout, ProjectGalleryLayout } from "../../components/ProjectLayouts";
import { useProjectListViewModel } from "@/viewModels/ProjectListViewModel";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import { EmptyProjects } from "@/components/EmptyDisplay";

interface ProjectFinalViewModelProps {
  type: "home" | "other";
  mode: "zigzag" | "gallery";
}

const ProjectFinalViewModel = ({ type, mode }: ProjectFinalViewModelProps) => {
  
  // Sử dụng ProjectListViewModel để fetch dữ liệu
  // Dùng limit 4 cho home page, 8 cho trang khác
  const projectLimit = type === "home" ? 4 : 8;
  const {
    isLoading,
    error,
    projects,
    getProjectsForDisplay,
    refreshProjects
  } = useProjectListViewModel(projectLimit);

  // Lấy danh sách project đã format để hiển thị
  const displayProjects = getProjectsForDisplay();

  // Hiển thị loading nếu đang tải và chưa có dữ liệu
  if (isLoading && projects.length === 0) {
    return (
      <div className="bg-[four] font-primary py-20">
        <LoadingSpinner />
      </div>
    );
  }

  // Hiển thị error nếu có lỗi và chưa có dữ liệu
  if (error && projects.length === 0) {
    return (
      <div className="bg-[four] font-primary py-20">
        <ErrorDisplay error={error} onRetry={refreshProjects} />
      </div>
    );
  }

  // Hiển thị empty state nếu không có dữ liệu
  if (!isLoading && !error && displayProjects.length === 0) {
    return (
      <div className="bg-[four] font-primary py-20">
        <EmptyProjects onRetry={refreshProjects} />
      </div>
    );
  }

  return (
    <div className="bg-[four] font-primary">
      <div className="2xl:max-w-[1400px] xl:max-w-7xl font-primary mx-auto py-6 sm:py-8 md:py-10 px-4">
        {type === "home" ? (
          <div className="text-center py-6 md:py-10 px-4">
            <h5 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">
              DỰ ÁN ĐÃ HOÀN THIỆN
            </h5>
            <p className="font-extralight text-base sm:text-lg md:text-xl lg:text-2xl text-third mt-4">
              Chúng tôi là công ty nội thất với +15 năm kinh nghiệm trong lĩnh
              vực thi công và thiết kế nội thất.
              <br className="hidden sm:block" /> Tự tin là đối tác đáng tin cậy trong các lĩnh vực sau.
            </p>
          </div>
        ) : 
        
        null}

        {/* Render layout dựa theo mode và truyền dữ liệu project */}
        {mode === "zigzag" && <ProjectZigzagLayout projects={displayProjects} />}
        {mode === "gallery" && <ProjectGalleryLayout projects={displayProjects} />}
      </div>
    </div>
  );
};

export default ProjectFinalViewModel;

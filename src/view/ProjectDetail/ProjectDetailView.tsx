import { useParams } from "react-router-dom";
import { useProjectDetailViewModel } from "@/viewModels/ProjectDetailViewModel/useProjectDetailViewModel";
import {
  ProjectInfo,
  ProjectContentDescription,
  ProjectNavigation,
} from "@/components/ProjectDetail";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";

/**
 * Trang chi tiết dự án - View component
 * Sử dụng ViewModel để quản lý logic và API calls với WordPress
 */
const ProjectDetailView = () => {
  const { id: projectId } = useParams<{ id: string }>();

  // Sử dụng ViewModel để quản lý logic
  const {
    projectDetail,
    loading,
    error,
    getNextProjectId,
    getPreviousProjectId,
  } = useProjectDetailViewModel(projectId || "");

  const handleBack = () => {
    // Navigate to previous project
    const prevId = getPreviousProjectId();
    window.location.href = `/project/${prevId}`;
  };

  const handleNext = () => {
    // Navigate to next project
    const nextId = getNextProjectId();
    window.location.href = `/project/${nextId}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen w-screen bg-white flex items-center justify-center">
        <ErrorDisplay error={error} />
      </div>
    );
  }

  // No project found
  if (!projectDetail) {
    return (
      <div className="min-h-screen w-screen bg-white flex items-center justify-center">
        <ErrorDisplay error="Không tìm thấy dự án" />
      </div>
    );
  }

  console.log(projectDetail);
  

  return (
    <div className="min-h-screen w-screen bg-white">
      {/* Banner với thông tin dự án */}
      
      <div className="bg-[linear-gradient(0deg,rgba(255,255,255,0.05)_0%,rgba(185,165,144,0.740859)_0%,#9F8467_100%)] flex flex-col md:py-40 pb-10 pt-15 justify-center items-center">
        <div className="py-5 p-4 text-second font-bold text-2xl md:text-8xl flex flex-col items-center justify-center gap-5">
          <h4>{projectDetail.title}</h4>
          <p className="font-extralight md:text-2xl text-xs w-fit md:max-w-6xl text-center" 
          dangerouslySetInnerHTML={{
                      __html: projectDetail.description,
                    }}>
          
          </p>
        </div>
        <div className=" md:w-9/12 md:h-[700px] m-aut aspect-video  p-4">
          <img src={projectDetail.mainImage} alt="" className="w-full h-full" />
        </div>
      </div>
      {/* Nội dung chính */}
      <div className="container mx-auto px-4 py-12">
        {/* Row đầu: Nội dung mô tả + Thông tin dự án */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Nội dung chi tiết từ WordPress Editor */}
          <div className="col-span-2">
            {projectDetail.content && (
              <div className="pr-8">
                <ProjectContentDescription
                  content={projectDetail.content}
                />
              </div>
            )}
          </div>

          {/* Right: Thông tin dự án */}
          <div className="col-span-1">
            <ProjectInfo
              location={projectDetail.location}
              duration={projectDetail.duration}
              budget={projectDetail.budget}
              address="84 Nguyễn Công Trứ" // Có thể lấy từ API sau
            />
          </div>
        </div>

        

        {/* Navigation */}
        <div className="py-8">
          <ProjectNavigation
            onBack={handleBack}
            onNext={handleNext}
            backImage={projectDetail.galleryImages[1] || ""}
            nextImage={projectDetail.galleryImages[2] || ""}
            hasPrevious={parseInt(projectDetail.id) > 1}
            hasNext={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailView;

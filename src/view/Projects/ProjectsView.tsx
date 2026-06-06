import BannerViewModel from "@/viewModels/BannerViewModel/BannerViewModel";
import SEOHead from "@/components/SEOHead/SEOHead";
import FormContactViewModel from "@/viewModels/FormContactViewModel/FormContactViewModel";
import ProjectFinalViewModel from "@/viewModels/ProjectFinalViewModel/ProjectFinalViewModel";
import QuestionViewModel from "@/viewModels/QuestionViewModel/QuestionViewModel";

const ProjectsView = () => {
  return (
    <>
      <SEOHead
        title="Dự án nội thất"
        description="Danh sách các dự án thiết kế và thi công nội thất của Mộc Đức."
        type="website"
      />
      <div className="min-h-screen w-screen bg-gray-50">
        <BannerViewModel
          type="other"
          title="DỰ ÁN CỦA CHÚNG TÔI"
          subtitle="TRANG CHỦ / DỰ ÁN"
        />

        <ProjectFinalViewModel type="other" mode="gallery" />
        <QuestionViewModel />
        <FormContactViewModel />
      </div>
    </>
  );
};

export default ProjectsView;

interface ProjectNavigationProps {
  onBack: () => void;
  onNext: () => void;
  backImage?: string;
  nextImage?: string;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const ProjectNavigation = ({
  onBack,
  onNext,
  backImage,
  nextImage,
  hasPrevious = true,
  hasNext = true,
}: ProjectNavigationProps) => {
  return (
    <div className="flex justify-between items-center w-full border-t-1 border-primary pt-10">
      {/* Back Section */}
      <div className="flex items-center gap-6">
        {backImage && (
          <div className="w-32 h-24 bg-gray-200 overflow-hidden">
            <img
              src={backImage}
              alt="Previous project"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <button
          onClick={onBack}
          disabled={!hasPrevious}
          className={`text-2xl font-medium tracking-wider transition-colors duration-300 ${
            hasPrevious
              ? "text-[#B8A082] hover:text-[#9F8467]"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          BACK
        </button>
      </div>

      {/* Next Section */}
      <div className="flex items-center gap-6">
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`text-2xl font-medium tracking-wider transition-colors duration-300 ${
            hasNext
              ? "text-[#B8A082] hover:text-[#9F8467]"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          NEXT
        </button>
        {nextImage && (
          <div className="w-32 h-24 bg-gray-200 overflow-hidden">
            <img
              src={nextImage}
              alt="Next project"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectNavigation;

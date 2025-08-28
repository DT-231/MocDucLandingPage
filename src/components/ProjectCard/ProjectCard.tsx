import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  showLeftButton?: boolean;
  showRightButton?: boolean;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  layout?: 'image-caption' | 'caption-image' | 'sole' | 'gallery';
  className?: string;
}

const ProjectCard = ({
  imageUrl,
  title,
  showLeftButton = false,
  showRightButton = false,
  onLeftClick,
  onRightClick,
  layout = 'image-caption',
  className = ''
}: ProjectCardProps) => {
  const isImageFirst = layout === 'image-caption';
  const isSole = layout === 'sole';
  const isGallery = layout === 'gallery';
  
  const cardContent = (
    <div className={`max-w-[300px] sm:max-w-md  mx-auto ${
      isGallery 
        ? 'p-4 border-2 border-primary rounded-4xl bg-white flex flex-col overflow-hidden h-full max-h-[400px] sm:max-h-none max-w-[500px]'
        : isSole
        ? 'p-4 border-2 border-primary rounded-4xl bg-white flex flex-col overflow-hidden w-full max-w-[300px] sm:max-w-md mx-auto h-full max-h-[400px] sm:max-h-none'
        : 'p-4 border-2 border-primary rounded-4xl bg-white flex flex-col overflow-hidden h-full max-h-[400px] sm:max-h-none'
    }`}>
      {/* Ảnh */}
      <div className="flex-[2] min-h-0">
        <a href="" className="block h-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full rounded-t-3xl h-full object-cover"
          />
        </a>
      </div>

      {/* Chữ */}
      <div className="flex-1 p-2 sm:p-3 md:p-4 lg:p-5 text-center flex justify-center items-center min-h-0">
        <h5 className={`font-extralight leading-[118%] ${
          isGallery 
            ? 'text-2xl lg:text-5xl' 
            : 'text-2xl  2xl:text-5xl'
        }`}>{title}</h5>
      </div>
    </div>
  );

  const leftButton = showLeftButton && (
    <div className="hidden sm:flex items-center justify-center">
      <button 
        onClick={onLeftClick}
        className="font-light inline-flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-white transition-transform duration-300 ease-in-out hover:translate-x-1"
      >
        <ChevronLeft size={40} className="sm:w-12 sm:h-12 -translate-x-0.5"/>
      </button>
    </div>
  );

  const rightButton = showRightButton && (
    <div className="hidden sm:flex items-center justify-center">
      <button 
        onClick={onRightClick}
        className="text-5xl sm:text-7xl font-light inline-flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-white transition-transform duration-300 ease-in-out hover:translate-x-1"
      >
        <ChevronRight size={40} className="sm:w-12 sm:h-12 translate-x-0.5"/>
      </button>
    </div>
  );

  return (
    <>
      {/* Layout Gallery - dạng lưới */}
      {isGallery && (
        <div className={`${className}`}>
          {cardContent}
        </div>
      )}
      
      {/* Layout Sole - chỉ card không button */}
      {isSole && (
        <div className={`${className}`}>
          {cardContent}
        </div>
      )}
      
      {/* Layout với buttons */}
      {!isGallery && !isSole && (
        <>
          {/* Khi có button */}
          {(showLeftButton || showRightButton) && (
            <div className={`flex items-stretch h-[400px] sm:h-[600px] gap-2 sm:gap-4 ${className}`}>
              {!isImageFirst && (showLeftButton ? leftButton : showRightButton ? rightButton : null)}
              <div className="flex-1 min-w-0">
                {cardContent}
              </div>
              {isImageFirst && (showRightButton ? rightButton : showLeftButton ? leftButton : null)}
            </div>
          )}
          
          {/* Khi không có button - card chiếm full width */}
          {!showLeftButton && !showRightButton && (
            <div className={`w-full h-[400px] sm:h-[750px] ${className}`}>
              {cardContent}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProjectCard;

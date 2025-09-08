interface ProjectGalleryProps {
  images: string[];
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  return (
    <div className="w-full">
      {/* Gallery Grid - 2x2 với layout giống trong ảnh */}
      <div className="grid grid-cols-2 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="aspect-[4/3] overflow-hidden bg-gray-200">
            <img 
              src={image} 
              alt={`Hình ảnh dự án ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        ))}
      </div>
      
      {/* Hiển thị thông báo nếu có nhiều hơn 4 ảnh */}
      {images.length > 4 && (
        <p className="text-sm text-gray-600 mt-2 text-center">
          Và {images.length - 4} hình ảnh khác
        </p>
      )}
    </div>
  );
};

export default ProjectGallery;

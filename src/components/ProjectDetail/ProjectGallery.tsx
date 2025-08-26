interface ProjectGalleryProps {
  images: string[];
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  return (
    <div className="w-full">
      {/* Gallery Grid - 2x2 */}
      <div className="grid grid-cols-2 gap-4">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden bg-gray-200">
            <img 
              src={image} 
              alt={`Project image ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;

interface ProjectInfoProps {
  projectType: string;
  location: string;
  duration: string;
  budget: string;
  address: string;
}

const ProjectInfo = ({ projectType, location, duration, budget, address }: ProjectInfoProps) => {
  return (
    <div className="bg-white ">
      <div className="space-y-8 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <span className="font-medium text-primary  text-3xl tracking-wider">LOẠI</span>
          <span className="text-gray-800 text font-medium">{projectType}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-medium text-primary  text-3xl tracking-wider">KHU VỰC</span>
          <span className="text-gray-800 text font-medium">{location}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-medium text-primary  text-3xl tracking-wider">THỜI HẠN CÔNG VIỆC</span>
          <span className="text-gray-800 text font-medium">{duration}</span>
        </div>

        
        <div className="flex justify-between items-center">
          <span className="font-medium text-primary  text-3xl tracking-wider">NGÂN SÁCH</span>
          <span className="text-gray-800 text font-medium">{budget}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-medium text-primary  text-3xl tracking-wider">VỊ TRÍ</span>
          <span className="text-gray-800 text font-medium">{address}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;

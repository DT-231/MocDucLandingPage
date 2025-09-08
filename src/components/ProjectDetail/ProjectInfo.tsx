interface ProjectInfoProps {
  projectType?: string;
  location: string;
  duration: string;
  budget: string;
  address?: string; // Thêm field address cho VỊ TRÍ
}

const ProjectInfo = ({ projectType = "Interior Design", location, duration, budget, address }: ProjectInfoProps) => {
  // Format budget thành định dạng tiền tệ VND
  const formatBudget = (amount: string) => {
    const numAmount = parseInt(amount);
    if (isNaN(numAmount)) return amount;
    
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(numAmount);
  };

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
          <span className="text-gray-800 text font-medium">{formatBudget(budget)}</span>
        </div>
        
        {/* Thêm field VỊ TRÍ nếu có address */}
        {address && (
          <div className="flex justify-between items-center">
            <span className="font-medium text-primary  text-3xl tracking-wider">VỊ TRÍ</span>
            <span className="text-gray-800 text font-medium">{address}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;

import { useState, useEffect } from 'react';

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
  type: string;
  budget: string;
  duration: string;
  teamSize: string;
  location: string;
  createdAt?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export const useProjectDetailViewModel = (projectId: string) => {
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setLoading(true);
        
        // Mock data - replace with actual API call
        const mockProjectDetail: ProjectDetail = {
          id: projectId,
          title: "THIẾT KẾ SANG TRỌNG",
          description: "Dự án thiết kế nội thất phòng khách sang trọng với tông màu beige và brown chủ đạo. Không gian được bố trí hợp lý với ghế sofa modular, bàn trà hiện đại và các chi tiết trang trí tinh tế. Ánh sáng tự nhiên được tận dụng tối đa qua cửa sổ lớn, tạo cảm giác thoáng đãng và ấm cúng. Thiết kế hướng đến sự hoàn hảo trong từng chi tiết, mang lại không gian sống đẳng cấp và thoải mái cho gia đình.",
          mainImage: "/src/assets/Images/bannerHome.jpg",
          galleryImages: [
            "/src/assets/Images/aboutUs1.jpg",
            "/src/assets/Images/aboutUs2.jpg", 
            "/src/assets/Images/bannerAboutUs.png",
            "/src/assets/Images/kep.png"
          ],
          type: "Interior Design",
          budget: "500 triệu",
          duration: "3 tháng",
          teamSize: "5 người",
          location: "Hà Nội, Việt Nam",
          status: 'completed',
          createdAt: new Date().toISOString()
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setProjectDetail(mockProjectDetail);
      } catch (err) {
        setError('Không thể tải thông tin dự án');
        console.error('Error fetching project detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectDetail();
    }
  }, [projectId]);

  const allImages = projectDetail ? [projectDetail.mainImage, ...projectDetail.galleryImages] : [];

  const selectImage = (index: number) => {
    if (index >= 0 && index < allImages.length) {
      setSelectedImageIndex(index);
    }
  };

  const getNextProjectId = (): string => {
    const currentId = parseInt(projectId);
    return (currentId + 1).toString();
  };

  const getPreviousProjectId = (): string => {
    const currentId = parseInt(projectId);
    return Math.max(1, currentId - 1).toString();
  };

  return {
    projectDetail,
    selectedImageIndex,
    allImages,
    loading,
    error,
    selectImage,
    getNextProjectId,
    getPreviousProjectId
  };
};

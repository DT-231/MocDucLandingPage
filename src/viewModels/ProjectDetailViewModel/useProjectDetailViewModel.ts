import { useState, useEffect } from 'react';
import type { ProjectData } from '@/models/ProjectType/ProjectType';
import { ProjectService } from '@/Services/ProjectService';

// Interface cho dữ liệu đã được transform từ WordPress API
export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  mainImage: string;
  galleryImages: string[];
  type: string;
  budget: string;
  duration: string;
  location: string;
  slug: string;
  date: string;
  status: 'published' | 'draft' | 'private';
}

// Function để transform dữ liệu từ WordPress API thành ProjectDetail
const transformProjectData = (data: ProjectData): ProjectDetail => {
  const galleryImages = data.acf.project_gallery?.map(img => img.url) || [];
  const mainImage = galleryImages[0] || '';
  
  return {
    id: data.id.toString(),
    title: data.title.rendered,
    description: data.acf.project_description || '',
    content: data.acf.project_content || '', // Sử dụng content.rendered từ WordPress
    mainImage,
    galleryImages,
    type: 'project', // Có thể tùy chỉnh theo phân loại
    budget: data.acf.project_budget || '',
    duration: data.acf.project_duration || '',
    location: data.acf.project_location || '',
    slug: data.slug,
    date: data.date,
    status: data.status === 'publish' ? 'published' : data.status as 'published' | 'draft' | 'private'
  };
};

export const useProjectDetailViewModel = (projectId: string) => {
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setLoading(true);
        
        // Gọi API WordPress thực tế thông qua Service
        const projectData = await ProjectService.getProjectById(projectId);
        
        // Transform dữ liệu từ WordPress API format sang ProjectDetail format
        const transformedProject = transformProjectData(projectData);
        
        setProjectDetail(transformedProject);
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

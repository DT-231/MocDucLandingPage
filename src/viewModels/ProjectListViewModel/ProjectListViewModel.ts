import { useState, useEffect } from 'react';
import type { ProjectListViewModelState } from '@/models/ProjectType';
import { getProject } from '@/Services/ProjectServices';

// ViewModel quản lý danh sách Project
export const useProjectListViewModel = (initialLimit: number = 4) => {
  // Đảm bảo initialLimit hợp lệ
  const validInitialLimit = typeof initialLimit === 'number' && initialLimit > 0 ? initialLimit : 4;
  
  // State quản lý trạng thái loading, error và dữ liệu
  const [state, setState] = useState<ProjectListViewModelState>({
    isLoading: false,
    error: null,
    projects: [],
    currentPage: 1,
    totalPages: 1,
    hasMore: false
  });

  // Hàm fetch danh sách Project từ WordPress API
  const fetchProjects = async (limit: number = validInitialLimit, page: number = 1, append: boolean = false) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Đảm bảo tham số hợp lệ
      const validLimit = typeof limit === 'number' && limit > 0 ? limit : validInitialLimit;
      const validPage = typeof page === 'number' && page > 0 ? page : 1;
      
      // Gọi API để lấy danh sách project
      const projectsData = await getProject(validLimit, validPage);
      
      if (projectsData && Array.isArray(projectsData)) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          projects: append ? [...prev.projects, ...projectsData] : projectsData,
          currentPage: page,
          hasMore: projectsData.length === limit, // Nếu số lượng trả về bằng limit thì có thể còn dữ liệu
          error: null
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          projects: append ? prev.projects : [],
          error: 'Không tìm thấy dự án nào'
        }));
      }
    } catch (error) {
      console.error('Lỗi khi fetch danh sách dự án:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Có lỗi xảy ra khi tải danh sách dự án'
      }));
    }
  };

  // Hàm load thêm project (phân trang)  
  const loadMoreProjects = async (limit: number = validInitialLimit) => {
    if (!state.isLoading && state.hasMore) {
      // Đảm bảo limit luôn là number hợp lệ
      const validLimit = typeof limit === 'number' && limit > 0 ? limit : validInitialLimit;
      await fetchProjects(validLimit, state.currentPage + 1, true);
    }
  };

  // Hàm refresh danh sách
  const refreshProjects = async (limit: number = validInitialLimit) => {
    // Đảm bảo limit luôn là number hợp lệ
    const validLimit = typeof limit === 'number' && limit > 0 ? limit : validInitialLimit;
    await fetchProjects(validLimit, 1, false);
  };

  // useEffect để tự động fetch dữ liệu khi component mount
  useEffect(() => {
    fetchProjects(validInitialLimit);
  }, [validInitialLimit]);

  // Các getter functions để dễ dàng truy cập dữ liệu
  const getProjectsForDisplay = () => {
    return state.projects.map(project => {
      // Kiểm tra và lấy ảnh đầu tiên từ gallery
      const firstImage = Array.isArray(project.acf.project_gallery) && project.acf.project_gallery.length > 0
        ? project.acf.project_gallery[0].url
        : '/placeholder-image.svg';
      
      return {
        id: project.id.toString(),
        title: project.title.rendered,
        description: project.acf.project_description.replace(/<[^>]*>/g, '').substring(0, 200) + '...', // Remove HTML tags và cắt ngắn
        image: firstImage, // Lấy ảnh đầu tiên trong gallery hoặc placeholder
        category: project.acf.project_location,
        date: project.date,
        status: 'completed' as const,
        // Thêm các properties để tương thích với ProjectCard
        slug: project.slug,
        originalId: project.id, // ID số từ API
        originalData: project // Giữ lại data gốc để sử dụng khi cần
      };
    });
  };

  // Trả về state và các functions
  return {
    // State
    isLoading: state.isLoading,
    error: state.error,
    projects: state.projects,
    currentPage: state.currentPage,
    hasMore: state.hasMore,
    
    // Actions
    fetchProjects,
    loadMoreProjects,
    refreshProjects,
    
    // Getters
    getProjectsForDisplay
  };
};

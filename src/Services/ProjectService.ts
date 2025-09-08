import type { ProjectData } from '@/models/ProjectType/ProjectType';

/**
 * Service xử lý các API calls liên quan đến Project
 * Kết nối với WordPress REST API
 */
export class ProjectService {
  // Base URL cho project endpoint
  private static readonly BASE_URL = 'http://localhost:8085/wp-json/wp/v2/project';

  /**
   * Lấy chi tiết một dự án theo ID
   * @param projectId - ID của dự án cần lấy thông tin
   * @returns Promise<ProjectData> - Dữ liệu chi tiết dự án từ WordPress
   */
  static async getProjectById(projectId: string | number): Promise<ProjectData> {
    try {
      const response = await fetch(`${this.BASE_URL}/${projectId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ProjectData = await response.json();
      return data;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết dự án:', error);
      throw new Error('Không thể tải thông tin dự án');
    }
  }

  /**
   * Lấy danh sách tất cả dự án
   * @param page - Số trang (mặc định: 1)
   * @param perPage - Số item trên mỗi trang (mặc định: 10)
   * @returns Promise<ProjectData[]> - Danh sách dự án từ WordPress
   */
  static async getAllProjects(page: number = 1, perPage: number = 10): Promise<ProjectData[]> {
    try {
      const response = await fetch(`${this.BASE_URL}?page=${page}&per_page=${perPage}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ProjectData[] = await response.json();
      return data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách dự án:', error);
      throw new Error('Không thể tải danh sách dự án');
    }
  }

  /**
   * Lấy dự án theo slug
   * @param slug - Slug của dự án
   * @returns Promise<ProjectData> - Dữ liệu dự án từ WordPress
   */
  static async getProjectBySlug(slug: string): Promise<ProjectData> {
    try {
      const response = await fetch(`${this.BASE_URL}?slug=${slug}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ProjectData[] = await response.json();
      
      if (data.length === 0) {
        throw new Error('Không tìm thấy dự án');
      }
      
      return data[0];
    } catch (error) {
      console.error('Lỗi khi lấy dự án theo slug:', error);
      throw new Error('Không thể tải thông tin dự án');
    }
  }
}

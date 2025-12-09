import request from "@/configs/axios";
import type { ProjectData } from "../models/ProjectType";

// Hàm lấy danh sách project với phân trang
// limit mặc định là 4 cho dự án hoàn thiện, 8 cho trang project
const getProject = (limit: number = 4, page: number = 1): Promise<ProjectData[]> => {
  // Debug logging để kiểm tra tham số
  console.log('getProject called with:', { limit, page, limitType: typeof limit, pageType: typeof page });
  
  return request.get<ProjectData[]>(`/wp-json/wp/v2/project`, {
    params: {
      per_page: Number(limit), // Đảm bảo chuyển thành number
      page: Number(page)
    }
  });
};

// Hàm lấy project theo ID
const getProjectById = (id: number): Promise<ProjectData> => {
  return request.get<ProjectData>(`/wp-json/wp/v2/project/${id}`);
};

export { getProject, getProjectById };

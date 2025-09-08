import request from "@/configs/axios";
import type { ProjectData } from "../models/ProjectType";

// Hàm lấy danh sách project với phân trang
// limit mặc định là 4 cho dự án hoàn thiện, 8 cho trang project
const getProject = (limit: number = 4, page: number = 1): Promise<ProjectData[]> => {
  return request.get<ProjectData[]>(`/wp-json/wp/v2/project?per_page=${limit}&page=${page}`);
};

// Hàm lấy project theo ID
const getProjectById = (id: number): Promise<ProjectData> => {
  return request.get<ProjectData>(`/wp-json/wp/v2/project/${id}`);
};

export { getProject, getProjectById };

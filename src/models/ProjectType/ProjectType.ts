// Model định nghĩa cấu trúc dữ liệu cho Project từ WordPress API
export interface ProjectImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    "thumbnail-width": number;
    "thumbnail-height": number;
    medium: string;
    "medium-width": number;
    "medium-height": number;
    medium_large: string;
    "medium_large-width": number;
    "medium_large-height": number;
    large: string;
    "large-width": number;
    "large-height": number;
    "1536x1536": string;
    "1536x1536-width": number;
    "1536x1536-height": number;
    "2048x2048": string;
    "2048x2048-width": number;
    "2048x2048-height": number;
  };
}

// Model cho ACF fields của Project
export interface ProjectACF {
  project_gallery: ProjectImage[];
  project_location: string;
  project_duration: string;
  project_budget: string;
  project_description: string;
  project_content:string;
  
}

// Model chính cho Project data từ WordPress API
export interface ProjectData {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  template: string;
  class_list: string[];
  acf: ProjectACF;
  _links: {
    self: Array<{
      href: string;
      targetHints: {
        allow: string[];
      };
    }>;
    collection: Array<{
      href: string;
    }>;
    about: Array<{
      href: string;
    }>;
    "wp:attachment": Array<{
      href: string;
    }>;
    curies: Array<{
      name: string;
      href: string;
      templated: boolean;
    }>;
  };
}

// Legacy models for backward compatibility
export interface Project {
  slug: string | undefined;
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  date?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface ProjectListProps {
  projects: Project[];
  viewMode: 'gallery' | 'zigzag';
  onProjectClick: (projectId: string) => void;
  onViewModeChange?: (mode: 'gallery' | 'zigzag') => void;
  showViewToggle?: boolean;
}

export interface ProjectItemProps {
  project: Project;
  onClick?: (projectId: string) => void;
  // layout: 'gallery' | 'grid';
}

// Model cho ViewModel state quản lý danh sách Project
export interface ProjectListViewModelState {
  isLoading: boolean;
  error: string | null;
  projects: ProjectData[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

// Model cho ViewModel state quản lý chi tiết Project
export interface ProjectDetailViewModelState {
  isLoading: boolean;
  error: string | null;
  project: ProjectData | null;
}

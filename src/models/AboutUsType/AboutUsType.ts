// Model định nghĩa cấu trúc dữ liệu cho trang About Us từ WordPress API

export interface AboutUsImageData {
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
    'thumbnail-width': number;
    'thumbnail-height': number;
    medium: string;
    'medium-width': number;
    'medium-height': number;
    medium_large: string;
    'medium_large-width': number;
    'medium_large-height': number;
    large: string;
    'large-width': number;
    'large-height': number;
    '1536x1536': string;
    '1536x1536-width': number;
    '1536x1536-height': number;
    '2048x2048': string;
    '2048x2048-width': number;
    '2048x2048-height': number;
  };
}

// Model cho dữ liệu ACF (Advanced Custom Fields) của trang About Us
export interface AboutUsACF {
  tittle_about_us: string; // Giữ nguyên tên field từ API (có lỗi chính tả)
  description_about_us: string;
  image_down: AboutUsImageData;
  image_up: AboutUsImageData;
}

// Model tổng thể cho response từ WordPress API của About Us
export interface AboutUsData {
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
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: {
    _acf_changed: boolean;
    footnotes: string;
  };
  class_list: string[];
  acf: AboutUsACF;
  _links: any;
}

// Model cho ViewModel state quản lý trạng thái trang About Us
export interface AboutUsViewModelState {
  isLoading: boolean;
  error: string | null;
  aboutUsData: AboutUsData | null;
}

// Type cho props của AboutUsHistory component
export interface AboutUsHistoryProps {
  className?: string;
}

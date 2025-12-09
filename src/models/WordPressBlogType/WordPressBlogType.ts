// Interface định nghĩa cấu trúc dữ liệu blog từ WordPress API
export interface WordPressFeaturedImage {
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

export interface WordPressACF {
  title: string;
  featured_image: WordPressFeaturedImage | false; // Có thể là false khi không có ảnh
  content_blog: string;
}

export interface WordPressBlogResponse {
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
  acf: WordPressACF;
  _links: {
    self: Array<{ href: string; targetHints?: { allow: string[] } }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    'wp:attachment': Array<{ href: string }>;
    curies: Array<{ name: string; href: string; templated: boolean }>;
  };
}

// Interface cho dữ liệu blog đã được chuẩn hóa để sử dụng trong ứng dụng
export interface BlogItem {
  id: number;
  title: string;
  description: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  date: string;
  slug: string;
  link: string;
  readTime?: string; // Tính toán dựa trên độ dài nội dung
}

// Interface cho việc phân trang và lọc
export interface BlogsApiParams {
  page?: number;
  per_page?: number;
  search?: string;
  orderby?: 'date' | 'title' | 'id';
  order?: 'asc' | 'desc';
}

// Interface cho response từ API (bao gồm metadata)
export interface BlogsApiResponse {
  data: BlogItem[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

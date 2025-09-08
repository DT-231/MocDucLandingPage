// Định nghĩa interface cho từng service item
export interface ServiceItem {
  tittle: string; // Note: API response có "tittle" thay vì "title"
  description: string;
  icon: string; // SVG string hoặc icon name
}

// Định nghĩa interface cho ACF fields của trang Services
export interface ServicesACF {
  service: ServiceItem[];
}

// Định nghĩa interface cho dữ liệu trang Services từ WordPress API
export interface ServicesData {
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
  acf: ServicesACF;
}

// Định nghĩa state cho ServicesViewModel
export interface ServicesViewModelState {
  isLoading: boolean;
  error: string | null;
  servicesData: ServicesData | null;
}

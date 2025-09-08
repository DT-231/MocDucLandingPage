// Model định nghĩa cấu trúc dữ liệu cho trang Home từ WordPress API
export interface HomePageBannerImage {
  ID: number;
  url: string;
  alt: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    medium: string;
    large: string;
  };
}

export interface HomePageProcessStep {
  tittle: string; // Giữ nguyên tên field từ API (có lỗi chính tả)
  description: string;
}

export interface HomePageService {
  title: string;
  content: string;
  icon: string;
}

export interface HomePageAboutIntroImage {
  ID: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface HomeABoutIntroVideo {
  ID: number;
  id: number;
  title:string;
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
  mime_type:string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
}

// Model chính cho dữ liệu ACF (Advanced Custom Fields) của trang Home
export interface HomePageACF {
  // Banner section
  banner_title: string;
  banner_description: string;
  banner_image: HomePageBannerImage[];

  // About Us section
  home_about: string;
  home_about_intro_image: HomePageAboutIntroImage;
  home_about_intro_video: HomeABoutIntroVideo;
  home_about_description: string;
  home_about_number_of_years_of_experience: string;
  home_about_project_experience: string;
  home_about_count_customer: string;

  // Process section
  process_title: string;
  process_description: string;
  process_steps: HomePageProcessStep[];

  // Service section
  service_title: string;
  service_description: string;
  services: HomePageService[];
}

// Model tổng thể cho response từ WordPress API
export interface HomePageData {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: HomePageACF;
}

// Model cho ViewModel state quản lý trạng thái trang Home
export interface HomePageViewModelState {
  isLoading: boolean;
  error: string | null;
  homeData: HomePageData | null;
}

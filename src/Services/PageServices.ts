import request from "@/configs/axios";
import type { HomePageData } from "@/models/HomePageType";
import type { AboutUsData } from "@/models/AboutUsType/AboutUsType";
import type { ServicesData } from "@/models/ServicesType";

// Hàm lấy trang theo slug với generic type
const getPageBySlug = <T = any>(slug: string): Promise<T[]> => {
  return request.get<T[]>(`/wp-json/wp/v2/pages?slug=${slug}`);
};

// Hàm lấy dữ liệu trang Home
const getHomePage = (): Promise<HomePageData[]> => {
  return getPageBySlug<HomePageData>('home');
};

// Hàm lấy dữ liệu trang About Us
const getAboutUsPage = (): Promise<AboutUsData[]> => {
  return getPageBySlug<AboutUsData>('about-us');
};

// Hàm lấy dữ liệu trang Services
const getServicesPage = (): Promise<ServicesData[]> => {
  return getPageBySlug<ServicesData>('services');
};

export { getPageBySlug, getHomePage, getAboutUsPage, getServicesPage };
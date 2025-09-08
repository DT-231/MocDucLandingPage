import { useState, useEffect } from 'react';
import type { HomePageData, HomePageViewModelState } from '@/models/HomePageType';
import { getHomePage } from '@/Services/PageServices';

// ViewModel quản lý logic và state cho trang Home
export const useHomePageViewModel = () => {
  // State quản lý trạng thái loading, error và dữ liệu
  const [state, setState] = useState<HomePageViewModelState>({
    isLoading: false,
    error: null,
    homeData: null
  });

  // Hàm fetch dữ liệu trang Home từ WordPress API
  const fetchHomePageData = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Gọi API để lấy dữ liệu trang home - interceptor đã trả về response.data
      const responseData = await getHomePage();
      
      // Kiểm tra xem response có dữ liệu không
      if (responseData && Array.isArray(responseData) && responseData.length > 0) {
        const homeData: HomePageData = responseData[0];
        setState(prev => ({
          ...prev,
          isLoading: false,
          homeData,
          error: null
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Không tìm thấy dữ liệu trang home'
        }));
      }
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu trang home:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Có lỗi xảy ra khi tải dữ liệu trang home'
      }));
    }
  };

  // useEffect để tự động fetch dữ liệu khi component mount
  useEffect(() => {
    fetchHomePageData();
  }, []);

  // Các getter functions để dễ dàng truy cập dữ liệu
  const getBannerData = () => {
    if (!state.homeData?.acf) return null;
    return {
      title: state.homeData.acf.banner_title,
      description: state.homeData.acf.banner_description,
      images: state.homeData.acf.banner_image
    };
  };

  const getAboutData = () => {
    if (!state.homeData?.acf) return null;
    return {
      title: state.homeData.acf.home_about,
      description: state.homeData.acf.home_about_description,
      image: state.homeData.acf.home_about_intro_image,
      videoUrl:state.homeData.acf.home_about_intro_video,
      yearsExperience: state.homeData.acf.home_about_number_of_years_of_experience,
      projectExperience: state.homeData.acf.home_about_project_experience,
      customerCount: state.homeData.acf.home_about_count_customer
    };
  };

  const getProcessData = () => {
    if (!state.homeData?.acf) return null;
    return {
      title: state.homeData.acf.process_title,
      description: state.homeData.acf.process_description,
      steps: state.homeData.acf.process_steps
    };
  };

  const getServiceData = () => {
    if (!state.homeData?.acf) return null;
    return {
      title: state.homeData.acf.service_title,
      description: state.homeData.acf.service_description,
      services: state.homeData.acf.services
    };
  };

  // Trả về state và các functions
  return {
    // State
    isLoading: state.isLoading,
    error: state.error,
    homeData: state.homeData,
    
    // Actions
    fetchHomePageData,
    
    // Getters
    getBannerData,
    getAboutData,
    getProcessData,
    getServiceData
  };
};

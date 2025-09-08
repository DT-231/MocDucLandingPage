import { useState, useEffect } from 'react';
import { getAboutUsPage } from '@/Services/PageServices';
import type { AboutUsViewModelState } from '@/models/AboutUsType/AboutUsType';

// Hook ViewModel quản lý logic và state cho component AboutUsHistory
// Theo kiến trúc MVVM: ViewModel không chứa UI, chỉ chứa logic và state
export const useAboutUsHistoryViewModel = () => {
  // State quản lý trạng thái loading, error và dữ liệu About Us
  const [state, setState] = useState<AboutUsViewModelState>({
    isLoading: true,
    error: null,
    aboutUsData: null,
  });

  // Effect fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Gọi API để lấy dữ liệu About Us
        const response = await getAboutUsPage();
        
        // Kiểm tra xem có dữ liệu trả về không
        if (response && response.length > 0) {
          setState({
            isLoading: false,
            error: null,
            aboutUsData: response[0], // Lấy item đầu tiên
          });
        } else {
          setState({
            isLoading: false,
            error: 'Không tìm thấy dữ liệu About Us',
            aboutUsData: null,
          });
        }
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu About Us:', error);
        setState({
          isLoading: false,
          error: 'Có lỗi xảy ra khi tải dữ liệu',
          aboutUsData: null,
        });
      }
    };

    fetchAboutUsData();
  }, []);

  // Hàm retry khi có lỗi
  const retryFetch = () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    // Trigger lại useEffect bằng cách tạo một state trigger
  };

  // Trả về state và các method cần thiết
  return {
    // Dữ liệu và state
    aboutUsData: state.aboutUsData,
    isLoading: state.isLoading,
    error: state.error,
    
    // Methods
    retryFetch,
    
    // Computed values (derived state)
    hasData: !!state.aboutUsData,
    title: state.aboutUsData?.acf?.tittle_about_us || 'Lịch Sử Hình Thành',
    description: state.aboutUsData?.acf?.description_about_us || '',
    imageDown: state.aboutUsData?.acf?.image_down?.url || '',
    imageUp: state.aboutUsData?.acf?.image_up?.url || '',
    imageDownAlt: state.aboutUsData?.acf?.image_down?.alt || 'About Us Background',
    imageUpAlt: state.aboutUsData?.acf?.image_up?.alt || 'About Us Overlay',
  };
};

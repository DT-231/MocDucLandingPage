import { useState, useEffect } from 'react';
import { getServicesPage } from '@/Services/PageServices';
import type {  ServicesViewModelState } from '@/models/ServicesType';

// Hook ViewModel quản lý logic và state cho trang Services
export const useServicesViewModel = () => {
  // State quản lý trạng thái loading, error và dữ liệu
  const [state, setState] = useState<ServicesViewModelState>({
    isLoading: false,
    error: null,
    servicesData: null
  });

  // Hàm fetch dữ liệu trang Services từ WordPress API
  const fetchServicesData = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Gọi API để lấy dữ liệu trang services
      const responseData = await getServicesPage();
      
      // Kiểm tra xem response có dữ liệu không
      if (responseData && Array.isArray(responseData) && responseData.length > 0) {
        const servicesData = responseData[0];
        
        setState(prev => ({
          ...prev,
          isLoading: false,
          servicesData,
          error: null
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Không tìm thấy dữ liệu trang Services'
        }));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải dữ liệu';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
    }
  };

  // Auto fetch dữ liệu khi component mount
  useEffect(() => {
    fetchServicesData();
  }, []);

  // Hàm retry khi có lỗi
  const retryFetch = () => {
    fetchServicesData();
  };

  return {
    ...state,
    retryFetch
  };
};

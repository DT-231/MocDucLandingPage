import { useState, useEffect } from 'react';
import HeaderContextJson from '@data/headerContext.json';

// Interface cho dữ liệu WordPress
interface WordPressData {
  company: {
    name: string;
    phone: string;
    email: string;
    address: string;
    facebook: string;
    tiktok: string;
    zalo: string;
    logo_url: string;
    site_icon_url: string;
  };
  header: {
    menu_items: Array<{ label: string; href: string; }>;
    bg_color: string;
    text_color: string;
    logo_url: string;
    cta: {
      text: string;
      link: string;
      color: string;
    };
  };
  timestamp?: number;
  debug?: {
    theme_dir: string;
    theme_uri: string;
  };
}

// Interface cho menu item từ JSON
interface HeaderContextItem {
  title: string;
  path: string;
}

// Hook chính để lấy dữ liệu WordPress với fallback JSON
export const useWordPressData = () => {
  const [wpData, setWpData] = useState<WordPressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem có dữ liệu WordPress không
    if (typeof window !== 'undefined' && (window as any).wpData) {
      const data = (window as any).wpData as WordPressData;
      
      // Đảm bảo menu_items có dữ liệu và không undefined
      if (!data.header.menu_items || !Array.isArray(data.header.menu_items) || data.header.menu_items.length === 0) {
        data.header.menu_items = HeaderContextJson.map((item: HeaderContextItem) => ({
          label: item.title,
          href: item.path
        }));
      }
      
      setWpData(data);
    } else {
      // Fallback sang dữ liệu JSON nếu không có WordPress
      const fallbackData: WordPressData = {
        company: {
          name: 'CÔNG TY TNHH TƯ VẤN THIẾT KẾ THI CÔNG NỘI THẤT MỘC ĐỨC',
          phone: '0905 300 703',
          email: 'info@mocduc.com',
          address: '84-86 Đ. Nguyên Công Trứ, An Khê, TP. Đà Nẵng',
          facebook: 'https://facebook.com/mocduc',
          tiktok: 'https://tiktok.com/@mocduc',
          zalo: 'https://zalo.me/0905300703',
          logo_url: '',
          site_icon_url: ''
        },
        header: {
          menu_items: HeaderContextJson.map((item: HeaderContextItem) => ({
            label: item.title,
            href: item.path
          })),
          bg_color: '#ffffff',
          text_color: '#000000',
          logo_url: '',
          cta: {
            text: 'Liên hệ ngay',
            link: '/contact',
            color: '#8A7258'
          }
        }
      };
      
      setWpData(fallbackData);
    }
    
    setIsLoading(false);
  }, []);

  return { wpData, isLoading };
};

// Hook riêng cho thông tin công ty
export const useCompanyData = () => {
  const { wpData, isLoading } = useWordPressData();
  
  return {
    companyData: wpData?.company || null,
    isLoading
  };
};

// Hook riêng cho dữ liệu header
export const useHeaderData = () => {
  const { wpData, isLoading } = useWordPressData();
  
  return {
    headerData: wpData?.header || null,
    isLoading
  };
};

export default useWordPressData;

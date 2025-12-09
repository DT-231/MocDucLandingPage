import HeaderContextJson from "@data/headerContext.json";

// Type definitions cho WordPress data
export interface MenuItem {
  label: string;
  href: string;
}

export interface HeaderData {
  menuItems: MenuItem[];
  bgColor: string;
  textColor: string;
  logoUrl: string;
  cta: {
    text: string;
    link: string;
    color: string;
  };
}

export interface CompanyData {
  name: string;
  phone: string;
  address: string;
  logoUrl: string;
  siteIconUrl: string;
}

export interface WordPressData {
  company: CompanyData;
  header: HeaderData;
}

// Hook để lấy dữ liệu từ WordPress Customizer
export const useWordPressData = () => {
  // Kiểm tra xem có dữ liệu từ WordPress không
  const wpData = (window as any).wpData || {};
  
  // Default company data
  const defaultCompany: CompanyData = {
    name: 'CÔNG TY TNHH TƯ VẤN THIẾT KẾ THI CÔNG NỘI THẤT MỘC ĐỨC',
    phone: '0905 300 703',
    address: '84-86 Đ. Nguyên Công Trứ, An Khê, TP. Đà Nẵng',
    logoUrl: '',
    siteIconUrl: '',
  };
  
  // Default header data - lấy từ headerContext.json
  const defaultHeader: HeaderData = {
    menuItems: HeaderContextJson.map(item => ({
      label: item.title,
      href: item.path
    })),
    bgColor: '#ffffff',
    textColor: '#000000',
    logoUrl: '',
    cta: {
      text: 'Liên hệ ngay',
      link: '/contact',
      color: '#8A7258',
    },
  };
  
  return {
    company: wpData.company || defaultCompany,
    header: wpData.header || defaultHeader,
  };
};

// Hook với type safety
export const useTypedWordPressData = (): WordPressData => {
  return useWordPressData() as WordPressData;
};

// Hook riêng cho company data (backward compatibility)
export const useCompanyData = (): CompanyData => {
  const { company } = useWordPressData();
  return company;
};

// Hook riêng cho header data
export const useHeaderData = (): HeaderData => {
  const { header } = useWordPressData();
  return header;
};

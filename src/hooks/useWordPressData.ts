// Hook để lấy dữ liệu từ WordPress Customizer
export const useWordPressData = () => {
  // Kiểm tra xem có dữ liệu từ WordPress không
  const wpData = (window as any).wpData || {};
  
  return {
    companyName: wpData.name || 'CÔNG TY TNHH TƯ VẤN THIẾT KẾ THI CÔNG NỘI THẤT MỘC ĐỨC',
    companyPhone: wpData.phone || '0905 300 703', 
    companyAddress: wpData.address || '84-86 Đ. Nguyên Công Trứ, An Khê, TP. Đà Nẵng',
    logoUrl: wpData.logo_url || '',
    siteIconUrl: wpData.site_icon_url || '',
  };
};

// Type definition cho WordPress data
export interface WordPressData {
  companyName: string;
  companyPhone: string;
  companyAddress: string;
  logoUrl: string;
  siteIconUrl: string;
}

// Hook với type safety
export const useTypedWordPressData = (): WordPressData => {
  return useWordPressData() as WordPressData;
};

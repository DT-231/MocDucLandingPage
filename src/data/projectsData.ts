import type { Project } from '@/models/ProjectType/ProjectType';

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Dự án Villa Sang Trọng',
    description: 'Thiết kế và thi công villa 3 tầng hiện đại với không gian mở, hướng tới sự tiện nghi và thẩm mỹ cao. Diện tích 500m2 với đầy đủ tiện ích.',
    image: '/src/assets/Images/bannerHome.jpg',
    category: 'Villa',
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Chung Cư Cao Cấp Green Tower',
    description: 'Dự án chung cư 32 tầng với 500 căn hộ cao cấp, tích hợp công viên xanh và nhiều tiện ích hiện đại cho cư dân.',
    image: '/src/assets/Images/bannerAboutUs.png',
    category: 'Chung cư',
    date: '2024-02-20',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Khu Biệt Thự Ven Sông',
    description: 'Khu biệt thự cao cấp với 50 căn nhà phố và biệt thự đơn lập, view sông tuyệt đẹp, thiết kế hiện đại kết hợp kiến trúc truyền thống.',
    image: '/src/assets/Images/bannerHome.jpg',
    category: 'Biệt thự',
    date: '2024-03-10',
    status: 'planned'
  },
  {
    id: '4',
    title: 'Nhà Ở Xã Hội An Cư',
    description: 'Dự án nhà ở xã hội với 200 căn hộ giá tốt, đảm bảo chất lượng sinh hoạt cho các gia đình có thu nhập trung bình.',
    image: '/src/assets/Images/bannerAboutUs.png',
    category: 'Nhà ở xã hội',
    date: '2024-04-05',
    status: 'completed'
  },
  {
    id: '5',
    title: 'Trung Tâm Thương Mại Diamond',
    description: 'Trung tâm thương mại 8 tầng với diện tích 10,000m2, tích hợp shop, nhà hàng, rạp chiếu phim và khu vui chơi giải trí.',
    image: '/src/assets/Images/bannerHome.jpg',
    category: 'Thương mại',
    date: '2024-05-12',
    status: 'in-progress'
  },
  {
    id: '6',
    title: 'Khu Đô Thị Mới Sunshine',
    description: 'Khu đô thị quy mô lớn với 1000 căn hộ, villa và townhouse, đầy đủ hạ tầng xanh và tiện ích công cộng hiện đại.',
    image: '/src/assets/Images/bannerAboutUs.png',
    category: 'Khu đô thị',
    date: '2024-06-18',
    status: 'planned'
  },
  {
    id: '7',
    title: 'Tòa Nhà Văn Phòng Sky Tower',
    description: 'Tòa nhà văn phòng 25 tầng tại trung tâm thành phố, thiết kế thông minh và tiết kiệm năng lượng với công nghệ hiện đại.',
    image: '/src/assets/Images/bannerHome.jpg',
    category: 'Văn phòng',
    date: '2024-07-22',
    status: 'completed'
  },
  {
    id: '8',
    title: 'Resort Biển Xanh',
    description: 'Khu nghỉ dưỡng 5 sao bên bờ biển với 100 phòng, spa, hồ bơi vô cực và nhiều hoạt động giải trí đẳng cấp quốc tế.',
    image: '/src/assets/Images/bannerAboutUs.png',
    category: 'Resort',
    date: '2024-08-15',
    status: 'in-progress'
  }
];

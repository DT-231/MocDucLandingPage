# News Component System

Hệ thống component tin tức cho ứng dụng MocDuc Landing, bao gồm đầy đủ các tính năng hiển thị, tìm kiếm và phân loại tin tức.

## Cấu trúc Components

### 1. NewsViewModel
Component chính để hiển thị danh sách tin tức trên trang chủ hoặc các trang khác.

**Props:**
- `limit?: number` - Giới hạn số lượng tin tức hiển thị (mặc định: 3)
- `className?: string` - CSS class tùy chỉnh
- `showViewAllButton?: boolean` - Hiển thị nút "Xem tất cả" (mặc định: true)

**Sử dụng:**
```tsx
import NewsViewModel from '@/viewModels/NewsViewModel/NewsViewModel';

// Hiển thị 3 tin tức mới nhất với nút "Xem tất cả"
<NewsViewModel limit={3} />

// Hiển thị tất cả tin tức không có nút "Xem tất cả"
<NewsViewModel limit={0} showViewAllButton={false} />
```

### 2. NewsItem
Component để hiển thị từng bài tin tức riêng lẻ.

**Props:**
- `news: News` - Dữ liệu tin tức (bắt buộc)
- `showReadMore?: boolean` - Hiển thị nút "XEM THÊM" (mặc định: true)
- `className?: string` - CSS class tùy chỉnh

**Sử dụng:**
```tsx
import NewsItem from '@/components/NewsItem/NewsItem';
import { sampleNews } from '@/data/newsData';

<NewsItem news={sampleNews[0]} />
```

### 3. NewsPage
Trang hiển thị danh sách đầy đủ tin tức với tính năng tìm kiếm và lọc theo danh mục.

**Tính năng:**
- Tìm kiếm theo tiêu đề và nội dung
- Lọc theo danh mục
- Responsive design
- Empty state khi không có kết quả

**Sử dụng:**
```tsx
import NewsPage from '@/view/News/NewsPage';

// Thường được sử dụng trong route /news
<NewsPage />
```

### 4. NewsDetail
Trang hiển thị chi tiết một bài tin tức.

**Tính năng:**
- Breadcrumb navigation
- Meta information (danh mục, ngày, thời gian đọc)
- Nội dung bài viết
- Nút chia sẻ social media
- Tin tức liên quan

**Sử dụng:**
```tsx
import NewsDetail from '@/view/News/NewsDetail';

// Thường được sử dụng trong route /news/:slug
<NewsDetail />
```

## Data Structure

### News Interface
```typescript
interface News {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime?: string;
  category?: string;
  slug?: string;
}
```

### Sample Data
Dữ liệu mẫu được lưu trong `src/data/newsData.ts` với 6 bài tin tức về các chủ đề:
- Thiết kế nội thất
- Xu hướng thiết kế
- Tối ưu không gian
- Xây dựng xanh
- Thiết kế phòng tắm
- Phối màu nội thất

## Styling

### Color Scheme
- Primary color: `#B8860B` (Vàng đồng)
- Hover color: `#A0741A` (Vàng đồng tối)
- Background: `#F9FAFB` (Xám nhạt)
- Text: `#111827` (Xám đen)

### CSS Classes
- Sử dụng Tailwind CSS
- Custom line-clamp utilities cho text truncation
- Responsive breakpoints: `md:`, `lg:`

## Features

### Responsive Design
- Mobile-first approach
- Breakpoints tối ưu cho các thiết bị
- Grid layout tự động điều chỉnh

### Performance
- Lazy loading images
- Optimized re-renders
- Efficient filtering và search

### Accessibility
- Semantic HTML
- Alt text cho images
- Keyboard navigation support
- ARIA labels where appropriate

## Cách thêm tin tức mới

1. Thêm dữ liệu vào `src/data/newsData.ts`:
```typescript
{
  id: '7',
  title: 'Tiêu đề tin tức',
  description: 'Mô tả ngắn gọn về tin tức...',
  image: '/path/to/image.jpg',
  date: '25 THÁNG 12',
  readTime: '3 phút đọc',
  category: 'Danh mục',
  slug: 'tieu-de-tin-tuc'
}
```

2. Thêm hình ảnh tương ứng vào `src/assets/Images/`

3. Components sẽ tự động cập nhật với dữ liệu mới

## Integration với Router

```tsx
// App.tsx hoặc router config
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewsPage from '@/view/News/NewsPage';
import NewsDetail from '@/view/News/NewsDetail';

<Routes>
  <Route path="/news" element={<NewsPage />} />
  <Route path="/news/:slug" element={<NewsDetail />} />
</Routes>
```

## Tùy chỉnh

### Thay đổi màu sắc
Cập nhật các class Tailwind trong components:
- `bg-[#B8860B]` → `bg-your-color`
- `text-[#B8860B]` → `text-your-color`
- `hover:bg-[#A0741A]` → `hover:bg-your-hover-color`

### Thay đổi layout
Điều chỉnh các class grid/flex trong NewsItem và NewsViewModel để thay đổi bố cục hiển thị.

### Thêm tính năng
- Pagination cho NewsPage
- Search suggestions
- Advanced filters
- Social sharing integration
- Comments system

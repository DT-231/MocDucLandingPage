# AboutUsHistory Component Integration

## Tổng quan

Đã tích hợp thành công dữ liệu từ WordPress API vào component `AboutUsHistory` theo kiến trúc MVVM.

## Kiến trúc sử dụng

### Model (`/src/models/AboutUsType/AboutUsType.ts`)
- Định nghĩa các interface cho dữ liệu About Us từ WordPress API
- Chứa types cho ACF fields: `tittle_about_us`, `description_about_us`, `image_down`, `image_up`
- Model không chứa logic, chỉ định nghĩa cấu trúc dữ liệu

### ViewModel (`/src/viewModels/AboutUsHistory/useAboutUsHistoryViewModel.ts`) 
- Hook quản lý state và logic nghiệp vụ
- Fetch dữ liệu từ API thông qua PageServices
- Xử lý loading, error và retry logic
- Cung cấp computed values cho View sử dụng
- Không chứa UI, chỉ chứa logic

### View (`/src/viewModels/AboutUsHistory/AboutUsHistory.tsx`)
- Component UI hiển thị dữ liệu
- Sử dụng ViewModel hook để lấy dữ liệu và state
- Hiển thị loading spinner và error handling
- Chỉ chứa UI, không chứa logic phức tạp

### Service (`/src/Services/PageServices.ts`)
- Chứa hàm `getAboutUsPage()` để fetch dữ liệu từ WordPress API
- Endpoint: `/wp-json/wp/v2/pages?slug=about-us`

## Dữ liệu từ WordPress API

Component sử dụng các field ACF từ WordPress:

```typescript
{
  "acf": {
    "tittle_about_us": "Lịch Sử Hình Thành",
    "description_about_us": "Mô tả về công ty...",
    "image_down": { 
      "url": "URL ảnh nền",
      "alt": "Alt text"
    },
    "image_up": {
      "url": "URL ảnh overlay", 
      "alt": "Alt text"
    }
  }
}
```

## Tính năng

1. **Dynamic Content**: Hiển thị title và description từ WordPress
2. **Dynamic Images**: Sử dụng ảnh từ WordPress, fallback về ảnh cục bộ
3. **Loading State**: Hiển thị spinner khi đang tải dữ liệu
4. **Error Handling**: Hiển thị lỗi và nút retry khi có vấn đề
5. **Fallback Content**: Hiển thị nội dung mặc định khi không có dữ liệu từ API

## Cách sử dụng

Component có thể được sử dụng trực tiếp trong các View:

```typescript
import AboutUsHistory from '@/viewModels/AboutUsHistory/AboutUsHistory';

// Trong component
<AboutUsHistory />
```

## Responsive Design

Component được thiết kế responsive với:
- Mobile-first approach
- Breakpoints: sm, md, lg
- Flexible grid layout
- Adaptive typography scaling

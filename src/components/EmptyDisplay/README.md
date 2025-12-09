# EmptyDisplay Components

> Components hiển thị trạng thái empty state khi không có dữ liệu

## 📋 Danh sách Components

### 1. EmptyDisplay (Base Component)

Component cơ bản để hiển thị empty state với khả năng tùy chỉnh cao.

```tsx
import EmptyDisplay from '@/components/EmptyDisplay';

<EmptyDisplay
  title="Không có dữ liệu"
  message="Hiện tại không có dữ liệu để hiển thị"
  buttonText="Tải lại"
  onAction={() => refetch()}
  showRefreshButton={true}
/>
```

### 2. EmptyProjects

Component chuyên dụng cho trường hợp không có project nào.

```tsx
import { EmptyProjects } from '@/components/EmptyDisplay';

<EmptyProjects onRetry={() => refetchProjects()} />
```

### 3. EmptyBlogs  

Component chuyên dùng khi không có bài viết nào.

```tsx
import { EmptyBlogs } from '@/components/EmptyDisplay';

<EmptyBlogs onRetry={() => refetchBlogs()} />
```

### 4. EmptySearchResult

Component hiển thị khi tìm kiếm không có kết quả.

```tsx
import { EmptySearchResult } from '@/components/EmptyDisplay';

<EmptySearchResult
  searchTerm={searchQuery}
  onClearSearch={() => setSearchQuery('')}
/>
```

### 5. EmptyList

Component linh hoạt cho các danh sách trống với icon tùy chỉnh.

```tsx
import { EmptyList } from '@/components/EmptyDisplay';

<EmptyList
  title="Giỏ hàng trống"
  message="Bạn chưa có sản phẩm nào trong giỏ hàng"
  icon={<ShoppingCartIcon />}
  onAction={() => navigateToProducts()}
  buttonText="Mua sắm ngay"
/>
```

## 🎨 Props Interface

### EmptyDisplayProps
```tsx
interface EmptyDisplayProps {
  title?: string;           // Tiêu đề (mặc định: "Không có dữ liệu")
  message: string;          // Thông điệp chính (bắt buộc)
  buttonText?: string;      // Text của button action (mặc định: "Tải lại")
  onAction?: () => void;    // Callback khi click button action
  showRefreshButton?: boolean; // Hiển thị button refresh trang (mặc định: true)
}
```

## 🎯 Sử Dụng Trong ViewModels

### Trong ProjectListViewModel
```tsx
// Trong render
{projects.length === 0 && !loading && !error && (
  <EmptyProjects onRetry={fetchProjects} />
)}
```

### Trong BlogsListViewModel  
```tsx
// Trong render
{blogs.length === 0 && !loading && !error && (
  <EmptyBlogs onRetry={fetchBlogs} />
)}
```

### Trong Search Results
```tsx
// Khi search không có kết quả
{searchResults.length === 0 && searchQuery && !loading && (
  <EmptySearchResult
    searchTerm={searchQuery}
    onClearSearch={() => setSearchQuery('')}
  />
)}
```

## 🎨 Styling

Components sử dụng TailwindCSS với:
- **Background:** `bg-[#FEFFFA]` (màu nền chính của website)
- **Colors:** Sử dụng `text-gray-400`, `text-gray-700`, `text-primary`
- **Responsive:** Responsive design với breakpoints `sm:`
- **Heights:** `min-h-[400px]` cho full empty state, `min-h-[300px]` cho compact

## 🔧 Customization

### Custom Icon
```tsx
<EmptyList
  icon={
    <svg className="w-16 h-16 mx-auto text-gray-400">
      {/* Custom SVG */}
    </svg>
  }
  message="Custom empty state"
/>
```

### Custom Styling
Các components đều có thể được wrap trong container với class tùy chỉnh:

```tsx
<div className="my-custom-empty-container">
  <EmptyProjects onRetry={handleRetry} />
</div>
```

## 📱 Responsive Behavior

- **Mobile:** Icon 16x16, text sizes smaller
- **Desktop:** Icon 20x20, larger text sizes  
- **Padding:** Responsive padding với `px-4`
- **Max Width:** `max-w-md` để content không quá rộng

## ♿ Accessibility

- Semantic HTML với proper heading hierarchy
- Color contrast tuân theo WCAG guidelines
- Keyboard navigation support cho buttons
- Screen reader friendly text

## 🚀 Performance

- Lightweight components chỉ render khi cần
- No external dependencies
- Optimized SVG icons
- Minimal re-renders

---

*Components này giúp cải thiện UX bằng cách cung cấp feedback rõ ràng cho user khi không có dữ liệu thay vì hiển thị màn hình trống.*

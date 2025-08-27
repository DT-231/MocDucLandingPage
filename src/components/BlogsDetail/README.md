# BlogsDetail Components

Tập hợp các component nhỏ được tách ra từ `BlogsDetail` theo kiến trúc **MVVM**.

## Cấu trúc thư mục

```
src/components/BlogsDetail/
├── index.ts                    // Export tất cả components
├── BlogsDetailHeader.tsx      // Header với tiêu đề và hình ảnh
├── BlogsDetailContent.tsx     // Nội dung chính bài viết
├── BlogsDetailSidebar.tsx     // Sidebar với search, categories, tags
├── BlogsDetailShareButtons.tsx // Nút chia sẻ
├── RelatedBlogsList.tsx       // Danh sách bài viết liên quan
└── README.md                  // Documentation

src/models/BlogsDetailType/
└── BlogsDetailType.ts         // Định nghĩa types cho components

src/viewModels/BlogsDetailViewModel/
└── BlogsDetailViewModel.tsx   // ViewModel chứa logic
```

## Components

### BlogsDetailHeader
Hiển thị header của trang blog detail với tiêu đề lớn và hình ảnh banner.

**Props:**
- `title`: Tiêu đề của bài viết
- `image`: URL hình ảnh banner
- `altText?`: Text thay thế cho hình ảnh

### BlogsDetailContent  
Hiển thị nội dung chính của bài blog bao gồm breadcrumb, meta info và nội dung chi tiết.

**Props:**
- `blog`: Thông tin blog (id, title, description, category, date, readTime)
- `onNavigate`: Function xử lý điều hướng

### BlogsDetailSidebar
Sidebar bên phải với search box, categories, recent blogs, tags và archives.

**Props:**
- `searchTerm`: Từ khóa tìm kiếm hiện tại
- `onSearchTermChange`: Function xử lý thay đổi search term
- `onSearchSubmit`: Function xử lý submit form search
- `categories`: Danh sách thể loại
- `recentBlogs`: Danh sách bài viết gần đây
- `tags`: Danh sách tags
- `archives`: Danh sách archives theo tháng
- `onNavigate`: Function xử lý điều hướng

### BlogsDetailShareButtons
Hiển thị các nút chia sẻ bài viết (Facebook, Twitter, Copy Link, Print).

**Props:**
- `onShareFacebook`: Function chia sẻ Facebook
- `onShareTwitter`: Function chia sẻ Twitter  
- `onCopyLink`: Function copy link
- `blog`: Thông tin blog (title, description)

### RelatedBlogsList
Hiển thị danh sách các bài viết liên quan cùng category.

**Props:**
- `relatedBlogs`: Danh sách blog liên quan
- `onNavigate`: Function xử lý điều hướng

## ViewModel

### useBlogsDetailViewModel
Hook chứa toàn bộ logic và state management cho trang BlogsDetail.

**Tham số:**
- `slug?`: Slug của blog cần hiển thị

**Return:**
- `blog`: Thông tin blog hiện tại
- `relatedBlogs`: Danh sách blog liên quan
- `recentBlogs`: Danh sách blog gần đây
- `categories`: Danh sách thể loại
- `tags`: Danh sách tags
- `archives`: Danh sách archives
- `showBackToTop`: Trạng thái hiển thị nút back to top
- `isLoading`: Trạng thái loading
- `searchTerm`: Từ khóa tìm kiếm
- Các handler functions

## Cách sử dụng

```tsx
import {
  BlogsDetailHeader,
  BlogsDetailContent,
  BlogsDetailSidebar,
  BlogsDetailShareButtons,
  RelatedBlogsList,
} from "@/components/BlogsDetail";
import { useBlogsDetailViewModel } from "@/viewModels/BlogsDetailViewModel/BlogsDetailViewModel";

const BlogsDetail = () => {
  const { slug } = useParams();
  const viewModel = useBlogsDetailViewModel(slug);

  return (
    <div>
      <BlogsDetailHeader 
        title={viewModel.blog?.title} 
        image={viewModel.blog?.image} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <BlogsDetailContent 
          blog={viewModel.blog} 
          onNavigate={viewModel.handleNavigate} 
        />
        
        <BlogsDetailSidebar 
          searchTerm={viewModel.searchTerm}
          onSearchTermChange={viewModel.handleSearchTermChange}
          onSearchSubmit={viewModel.handleSearch}
          categories={viewModel.categories}
          recentBlogs={viewModel.recentBlogs}
          tags={viewModel.tags}
          archives={viewModel.archives}
          onNavigate={viewModel.handleNavigate}
        />
      </div>

      <BlogsDetailShareButtons
        onShareFacebook={viewModel.handleShareFacebook}
        onShareTwitter={viewModel.handleShareTwitter}
        onCopyLink={viewModel.handleCopyToClipboard}
        blog={viewModel.blog}
      />

      <RelatedBlogsList
        relatedBlogs={viewModel.relatedBlogs}
        onNavigate={viewModel.handleNavigate}
      />
    </div>
  );
};
```

## Types

Các types được định nghĩa trong `@/models/BlogsDetailType/BlogsDetailType.ts`:

- **BlogsDetailHeaderProps**: Props cho header component
- **BlogsDetailContentProps**: Props cho content component  
- **BlogsDetailSidebarProps**: Props cho sidebar component
- **BlogsDetailShareButtonsProps**: Props cho share buttons component
- **RelatedBlogsListProps**: Props cho related blogs list component
- **CategoryItem**: Type cho item category
- **ArchiveItem**: Type cho item archive
- **RecentBlogItem**: Type cho recent blog item

## Lợi ích của việc tách component

1. **Dễ bảo trì**: Mỗi component có trách nhiệm rõ ràng
2. **Tái sử dụng**: Có thể sử dụng component ở nhiều nơi khác
3. **Dễ test**: Test từng component riêng biệt
4. **Tuân theo MVVM**: Logic được tách ra ViewModel, View chỉ hiển thị
5. **Code sạch hơn**: File nhỏ hơn, dễ đọc và hiểu hơn
6. **Quản lý types tập trung**: Types được đặt trong thư mục `models` theo chuẩn dự án

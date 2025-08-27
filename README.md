# 🏗️ Mộc Đức Landing Page

> Website landing page chuyên nghiệp cho công ty xây dựng và thiết kế nội thất Mộc Đức

## 📋 Mục Lục

- [Giới thiệu dự án](#giới-thiệu-dự-án)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt và chạy dự án](#cài-đặt-và-chạy-dự-án)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Tính năng website](#tính-năng-website)
- [Tích hợp WordPress](#tích-hợp-wordpress)
- [Build và Deploy](#build-và-deploy)

## 🎯 Giới thiệu dự án

**Mộc Đức Landing Page** là website giới thiệu doanh nghiệp cho công ty xây dựng và thiết kế nội thất Mộc Đức với hơn **15 năm kinh nghiệm** trong lĩnh vực thi công và thiết kế nội thất.

### ✨ Đặc điểm:
- 🏢 Giới thiệu đầy đủ về công ty và dịch vụ
- 📱 Responsive design, tương thích mọi thiết bị  
- 🎨 Thiết kế hiện đại, chuyên nghiệp
- ⚡ Tốc độ tải trang nhanh
- 🌐 Tích hợp với WordPress backend

## 🚀 Công nghệ sử dụng

- **React 19.1.1** - Thư viện UI chính
- **TypeScript ~5.8.3** - Ngôn ngữ lập trình
- **Vite 7.1.0** - Build tool và dev server
- **TailwindCSS 4.1.11** - CSS Framework
- **React Router DOM 7.8.0** - Routing
- **Axios 1.11.0** - HTTP client cho API calls
- **WordPress REST API** - Backend content management

## ️ Cài đặt và chạy dự án

### Yêu cầu hệ thống
- **Node.js** >= 18.0.0
- **npm** 

### Cài đặt và chạy
```bash
# Cài đặt packages
npm install

# Khởi động dev server
npm run dev
# Server sẽ chạy tại http://localhost:5173

# Build cho production
npm run build

# Kiểm tra lỗi code
npm run lint
```

## 📂 Cấu trúc dự án

Dự án áp dụng kiến trúc **MVVM (Model - View - ViewModel)**:

```
src/
├── assets/                 # Hình ảnh, icons
├── components/             # Reusable components  
├── layouts/               # Layout components (Header, Footer)
├── models/                # TypeScript interfaces
├── routes/                # Route definitions
├── view/                  # Pages/Views (Home, About, Projects, ...)
├── viewModels/            # Business logic
└── configs/               # Cấu hình (axios, ...)
```

## 🎨 Tính năng website

### 🏠 Trang chủ (Home)
- Banner hero với thông tin công ty
- Giới thiệu về công ty Mộc Đức  
- Dịch vụ nổi bật
- Dự án tiêu biểu
- Form liên hệ

### 👥 Giới thiệu (About Us)  
- Lịch sử và kinh nghiệm 15+ năm
- Thống kê dự án đã thực hiện

### 🏗️ Dự án (Projects)
- Danh sách dự án theo danh mục
- Chi tiết dự án với hình ảnh
- Thông tin kỹ thuật

### 🛠️ Dịch vụ (Services)
- **Thiết kế trọn gói**
- **Thi công & sửa chữa**  
- **Nội thất & trang trí**

### 📰 Blog/Tin tức
- Danh sách bài viết
- Chi tiết bài viết
- Chia sẻ social media

### 📞 Liên hệ (Contact)
- Form liên hệ
- Thông tin công ty
- Hotline: **0902300703**

## 🔗 Tích hợp WordPress

Website tích hợp với WordPress để quản lý nội dung:

```typescript
// API endpoint
baseURL: 'http://localhost:8085/'
```

### WordPress Theme Files:
```
MD_Landing/
├── index.php        # Main theme template
├── functions.php    # Theme functions  
├── style.css        # Theme styles
└── dist/           # Built React assets
```

## � Build và Deploy

### Build Production
```bash
npm run build
```

### Deploy Process
1. Build project: `npm run build`
2. Upload `MD_Landing/` folder lên server WordPress
3. Activate theme trong WordPress admin
4. Website sẽ hoạt động với React frontend + WordPress backend

---

## � Thông tin liên hệ

**Công ty Xây dựng Nội thất Mộc Đức**
- **Hotline**: 0902300703
- **Kinh nghiệm**: 15+ năm trong lĩnh vực xây dựng và nội thất

---

<div align="center">
  <p><strong>React + TypeScript + TailwindCSS + WordPress</strong></p>
</div>

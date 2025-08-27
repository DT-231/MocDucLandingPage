# GitHub Copilot Instructions

## Giới thiệu dự án
- Đây là dự án frontend sử dụng **React + TypeScript + Vite**, kiến trúc **MVVM (Model - View - ViewModel)**.
- Styling: **TailwindCSS** và **shadcn/ui**.
- Toàn bộ comment và giải thích code phải bằng **tiếng Việt**.

---

## Yêu cầu với GitHub Copilot

1. **Luôn viết comment bằng tiếng Việt** trong code gợi ý.  
   - Giải thích mục đích của biến, hàm, component.  
   - Nếu dùng hook, phải giải thích tại sao cần hook đó.  
   - Ví dụ:  
     ```tsx
     // Sử dụng useState để quản lý trạng thái mở/đóng của dialog
     const [isOpen, setIsOpen] = useState(false);
     ```

2. **Tuân theo kiến trúc MVVM**:  
   - ViewModel không chứa UI.  
   - View không chứa logic phức tạp, chỉ gọi ViewModel và hiển thị.  
   - Model chỉ chứa dữ liệu, không chứa logic.  

3. **Luôn dùng tiếng Việt khi trả lời/gợi ý trong Copilot Chat**.  
   - Code gợi ý có comment tiếng Việt.  
   - Giải thích bằng tiếng Việt.  

import axios from 'axios';
import type { 
  WordPressBlogResponse, 
  BlogItem, 
  BlogsApiParams, 
  BlogsApiResponse 
} from '@/models/WordPressBlogType/WordPressBlogType';

// Base URL cho WordPress API
const WORDPRESS_API_BASE_URL = 'http://localhost:8085/wp-json/wp/v2';
const BLOGS_ENDPOINT = '/blogs';

// Tạo instance axios riêng cho WordPress API
const wordpressApi = axios.create({
  baseURL: WORDPRESS_API_BASE_URL,
  timeout: 10000, // 10 giây timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Utility function để tính toán thời gian đọc dự kiến
 * @param content - Nội dung HTML của bài viết
 * @returns Thời gian đọc ước tính (phút)
 */
const calculateReadTime = (content: string): string => {
  // Loại bỏ HTML tags để đếm từ
  const plainText = content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.trim().split(/\s+/).length;
  
  // Tốc độ đọc trung bình: 200 từ/phút
  const readTimeMinutes = Math.ceil(wordCount / 200);
  return `${readTimeMinutes} phút đọc`;
};

/**
 * Utility function để tạo mô tả ngắn từ nội dung HTML
 * @param htmlContent - Nội dung HTML đầy đủ
 * @param maxLength - Độ dài tối đa của mô tả (mặc định 150 ký tự)
 * @returns Mô tả ngắn đã được làm sạch
 */
const extractDescription = (htmlContent: string, maxLength: number = 150): string => {
  // Loại bỏ HTML tags
  const plainText = htmlContent.replace(/<[^>]*>/g, '');
  
  // Cắt ngắn và thêm "..." nếu cần
  if (plainText.length <= maxLength) {
    return plainText.trim();
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
};

/**
 * Chuyển đổi dữ liệu từ WordPress API response thành format chuẩn của ứng dụng
 * @param wpBlog - Dữ liệu blog từ WordPress API
 * @returns BlogItem đã được chuẩn hóa
 */
const transformWordPressBlogToBlogItem = (wpBlog: WordPressBlogResponse): BlogItem => {
  return {
    id: wpBlog.id,
    title: wpBlog.acf.title || wpBlog.title.rendered,
    description: extractDescription(wpBlog.acf.content_blog || wpBlog.content.rendered),
    content: wpBlog.acf.content_blog || wpBlog.content.rendered,
    featuredImage: wpBlog.acf.featured_image?.url || '',
    featuredImageAlt: wpBlog.acf.featured_image?.alt || wpBlog.acf.title || wpBlog.title.rendered,
    date: wpBlog.date,
    slug: wpBlog.slug,
    link: wpBlog.link,
    readTime: calculateReadTime(wpBlog.acf.content_blog || wpBlog.content.rendered)
  };
};

/**
 * Service class để quản lý các API calls liên quan đến blogs
 */
export class BlogService {
  
  /**
   * Lấy danh sách tất cả blogs với các tham số tùy chọn
   * @param params - Các tham số query như page, per_page, search, etc.
   * @returns Promise chứa danh sách blogs và metadata
   */
  static async getAllBlogs(params: BlogsApiParams = {}): Promise<BlogsApiResponse> {
    try {
      const {
        page = 1,
        per_page = 10,
        search = '',
        orderby = 'date',
        order = 'desc'
      } = params;

      const response = await wordpressApi.get<WordPressBlogResponse[]>(BLOGS_ENDPOINT, {
        params: {
          page,
          per_page,
          search,
          orderby,
          order,
          _embed: true // Bao gồm featured image và metadata khác
        }
      });

      // Lấy thông tin phân trang từ response headers
      const total = parseInt(response.headers['x-wp-total'] || '0');
      const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1');

      // Chuyển đổi dữ liệu
      const transformedBlogs = response.data.map(transformWordPressBlogToBlogItem);

      return {
        data: transformedBlogs,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages
      };
    } catch (error) {
      console.error('Lỗi khi lấy danh sách blogs:', error);
      throw new Error('Không thể tải danh sách bài viết. Vui lòng thử lại sau.');
    }
  }

  /**
   * Lấy thông tin chi tiết một blog theo ID
   * @param id - ID của blog
   * @returns Promise chứa thông tin blog
   */
  static async getBlogById(id: number): Promise<BlogItem> {
    try {
      const response = await wordpressApi.get<WordPressBlogResponse>(`${BLOGS_ENDPOINT}/${id}`, {
        params: {
          _embed: true
        }
      });

      return transformWordPressBlogToBlogItem(response.data);
    } catch (error) {
      console.error(`Lỗi khi lấy blog có ID ${id}:`, error);
      throw new Error('Không thể tải bài viết. Vui lòng thử lại sau.');
    }
  }

  /**
   * Lấy thông tin chi tiết một blog theo slug
   * @param slug - Slug của blog
   * @returns Promise chứa thông tin blog
   */
  static async getBlogBySlug(slug: string): Promise<BlogItem> {
    try {
      const response = await wordpressApi.get<WordPressBlogResponse[]>(BLOGS_ENDPOINT, {
        params: {
          slug,
          _embed: true
        }
      });

      if (response.data.length === 0) {
        throw new Error('Không tìm thấy bài viết');
      }

      return transformWordPressBlogToBlogItem(response.data[0]);
    } catch (error) {
      console.error(`Lỗi khi lấy blog có slug ${slug}:`, error);
      throw new Error('Không thể tải bài viết. Vui lòng thử lại sau.');
    }
  }

  /**
   * Tìm kiếm blogs theo từ khóa
   * @param searchTerm - Từ khóa tìm kiếm
   * @param page - Trang hiện tại (mặc định: 1)
   * @param perPage - Số bài viết mỗi trang (mặc định: 10)
   * @returns Promise chứa kết quả tìm kiếm
   */
  static async searchBlogs(
    searchTerm: string, 
    page: number = 1, 
    perPage: number = 10
  ): Promise<BlogsApiResponse> {
    return this.getAllBlogs({
      search: searchTerm,
      page,
      per_page: perPage
    });
  }

  /**
   * Lấy các bài viết mới nhất
   * @param limit - Số lượng bài viết cần lấy (mặc định: 5)
   * @returns Promise chứa danh sách bài viết mới nhất
   */
  static async getLatestBlogs(limit: number = 5): Promise<BlogItem[]> {
    try {
      const response = await this.getAllBlogs({
        per_page: limit,
        orderby: 'date',
        order: 'desc'
      });

      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy bài viết mới nhất:', error);
      throw new Error('Không thể tải bài viết mới nhất. Vui lòng thử lại sau.');
    }
  }
}

export default BlogService;

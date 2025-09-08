import type { BlogItem } from '@/models/WordPressBlogType/WordPressBlogType';

/**
 * Adapter để chuyển đổi BlogItem từ API sang format cũ của các components
 */
export class BlogDataAdapter {
  
  /**
   * Chuyển đổi BlogItem thành format cho BlogsDetailContent
   */
  static toBlogsDetailContentFormat(blog: BlogItem) {
    return {
      id: blog.id.toString(),
      title: blog.title,
      description: blog.description,
      content: blog.content, // Thêm content để render HTML
      category: 'Thiết kế nội thất', // Default category, có thể mở rộng sau
      date: blog.date,
      readTime: blog.readTime,
    };
  }

  /**
   * Chuyển đổi BlogItem thành format cho sidebar recent blogs
   */
  static toSidebarRecentBlogsFormat(blogs: BlogItem[]) {
    return blogs.map(blog => ({
      id: blog.id.toString(),
      slug: blog.slug,
    }));
  }

  /**
   * Chuyển đổi BlogItem thành format cho related blogs
   */
  static toRelatedBlogsFormat(blogs: BlogItem[]) {
    return blogs.map(blog => ({
      id: blog.id.toString(),
      title: blog.title,
      description: blog.description,
      image: blog.featuredImage,
      category: 'Thiết kế nội thất', // Default category, có thể mở rộng sau
      date: blog.date,
      readTime: blog.readTime,
      slug: blog.slug,
    }));
  }

  /**
   * Chuyển đổi BlogItem thành format cho header
   */
  static toBlogsDetailHeaderFormat(blog: BlogItem) {
    return {
      title: blog.title,
      image: blog.featuredImage,
      altText: blog.featuredImageAlt,
    };
  }
}

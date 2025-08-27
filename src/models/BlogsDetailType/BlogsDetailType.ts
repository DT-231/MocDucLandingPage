/**
 * Types cho các component BlogsDetail
 * Chứa các interface và type definitions cho trang chi tiết blog
 */

export interface BlogsDetailHeaderProps {
  title: string;
  image: string;
  altText?: string;
}

export interface BlogsDetailContentProps {
  blog: {
    id: string;
    title: string;
    description: string;
    category?: string;
    date: string;
    readTime?: string;
  };
  onNavigate: (path: string) => void;
}

export interface BlogsDetailSidebarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  categories: Array<{ name: string; count: number }>;
  recentBlogs: Array<{ id: string; slug?: string }>;
  tags: string[];
  archives: Array<{ name: string; count: number }>;
  onNavigate: (path: string) => void;
}

export interface BlogsDetailShareButtonsProps {
  onShareFacebook: () => void;
  onShareTwitter: () => void;
  onCopyLink: () => void;
  blog: {
    title: string;
    description: string;
  };
}

export interface RelatedBlogsListProps {
  relatedBlogs: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    category?: string;
    date: string;
    readTime?: string;
    slug?: string;
  }>;
  onNavigate: (path: string) => void;
}

// Type cho category item
export interface CategoryItem {
  name: string;
  count: number;
}

// Type cho archive item
export interface ArchiveItem {
  name: string;
  count: number;
}

// Type cho recent blog item (simplified)
export interface RecentBlogItem {
  id: string;
  slug?: string;
}

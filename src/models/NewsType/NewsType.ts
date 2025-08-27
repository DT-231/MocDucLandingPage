export interface Blogs {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime?: string;
  category?: string;
  slug?: string;
}

export interface BlogsListProps {
  blogs: Blogs[];
  showReadMore?: boolean;
  limit?: number;
}

export interface BlogsItemProps {
  blogs: Blogs;
  showReadMore?: boolean;
  className?: string;
}

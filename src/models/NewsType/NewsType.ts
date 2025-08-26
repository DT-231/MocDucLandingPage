export interface News {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime?: string;
  category?: string;
  slug?: string;
}

export interface NewsListProps {
  news: News[];
  showReadMore?: boolean;
  limit?: number;
}

export interface NewsItemProps {
  news: News;
  showReadMore?: boolean;
  className?: string;
}

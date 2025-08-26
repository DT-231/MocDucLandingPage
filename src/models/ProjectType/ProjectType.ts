export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  date?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface ProjectListProps {
  projects: Project[];
  viewMode: 'gallery' | 'zigzag';
  onProjectClick: (projectId: string) => void;
  onViewModeChange?: (mode: 'gallery' | 'zigzag') => void;
  showViewToggle?: boolean;
}

export interface ProjectItemProps {
  project: Project;
  onClick?: (projectId: string) => void;
  // layout: 'gallery' | 'grid';
}

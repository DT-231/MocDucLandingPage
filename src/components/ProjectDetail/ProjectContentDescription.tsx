interface ProjectContentDescriptionProps {
  content: string;
}

/**
 * Component hiển thị nội dung mô tả chi tiết project từ WordPress
 * Hỗ trợ render HTML content từ WordPress editor
 */
const ProjectContentDescription = ({ content }: ProjectContentDescriptionProps) => {
  return (
    <div className="bg-white">
      <div className="prose prose-lg max-w-none">
        {/* Render HTML content từ WordPress */}
        <div 
          className="text-black leading-relaxed text-justify wordpress-content font-light text-base"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default ProjectContentDescription;

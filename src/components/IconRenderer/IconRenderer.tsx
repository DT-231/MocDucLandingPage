import React from 'react';

// Interface cho props của IconRenderer component
interface IconRendererProps {
  svgString: string;
  className?: string;
  size?: number;
}

// Component render icon từ SVG string của WordPress ACF
const IconRenderer: React.FC<IconRendererProps> = ({ 
  svgString, 
  className = "",
  size = 50
}) => {
  // Nếu không có SVG string, return null
  if (!svgString) {
    return null;
  }

  // Tạo props cho div container
  const containerProps = {
    className: `inline-flex ${className}`,
    style: { fontSize:size},
    dangerouslySetInnerHTML: { __html: svgString }
  };

  return <div {...containerProps} />;
};

export default IconRenderer;

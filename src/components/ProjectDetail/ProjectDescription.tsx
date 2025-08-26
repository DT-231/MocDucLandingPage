interface ProjectDescriptionProps {
  description: string;
}

const ProjectDescription = ({ description }: ProjectDescriptionProps) => {
  return (
    <div className="bg-white p-8">
      <div className="max-w-none">
        <p className="text-gray-700 leading-relaxed text-justify">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectDescription;

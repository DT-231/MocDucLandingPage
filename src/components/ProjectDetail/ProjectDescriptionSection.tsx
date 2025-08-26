interface ProjectDescriptionSectionProps {
  description: string;
}

const ProjectDescriptionSection = ({ description }: ProjectDescriptionSectionProps) => {
  return (
    <div className="">
      <div className="max-w-4xl font-extralight text-2xl flex flex-col gap-3 text-black">
        <p className="leading-relaxed text-justify">
          {description}
        </p>
        <p className="leading-relaxed text-justify">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectDescriptionSection;

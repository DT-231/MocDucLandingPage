import Images from "@/assets/Images";
import {
  ProjectInfo,
  ProjectGallery,
  ProjectDescription,
  ProjectDescriptionSection,
  ProjectNavigation,
} from "@/components/ProjectDetail";

const ProjectDetailView = () => {
  // Mock data - you can replace this with real data from props or API
  const projectData = {
    type: "Interior Design",
    location: "Đà Nẵng",
    duration: "10 day",
    budget: "20.000.000 vnđ",
    address: "84 Nguyễn Công Trứ",
    galleryImages: [
      Images.bannerHomeImage,
      Images.bannerAboutUsImage,
      Images.bannerHomeImage,
      Images.bannerAboutUsImage,
    ],
    shortDescription: `Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Massa tincidunt dui ut ornare lectus sit amet. Enim sit amet venenatis urna cursus. Viverra aliquet eget sit amet tellus cras. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Neque vitae tempus quam pellentesque. Nulla facilisi etiam dignissim diam quis enim lobortis. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Pharetra diam sit amet nisl. Tempor orci eu lobortis elementum nibh tellus molestie nunc non.Amet mauris commodo quis imperdiet massa. Auctor eu augue ut lectus arcu bibendum. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Amet nisl purus in mollis nunc sed id semper risus.`,
    longDescription: `Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Massa tincidunt dui ut ornare lectus sit amet. Enim sit amet venenatis urna cursus. Viverra aliquet eget sit amet tellus cras. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Neque vitae tempus quam pellentesque. Nulla facilisi etiam dignissim diam quis enim lobortis. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Pharetra diam sit amet nisl. Tempor orci eu lobortis elementum nibh tellus molestie nunc non.Amet mauris commodo quis imperdiet massa. Auctor eu augue ut lectus arcu bibendum. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Amet nisl purus in mollis nunc sed id semper risus.

Integer malesuada nunc vel risus. Magna ac placerat vestibulum lectus mauris ultricies. Cursus in hac habitasse platea dictumst quisque sagittis purus sit. Id nibh tortor id aliquet lectus proin nibh. Tortor posuere ac ut consequat semper. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin nibh. Tortor posuere ac ut consequat semper risus. In hendrerit gravida rutrum quisque non tellus orci ac. Leo a diam sollicitudin tempor id eu nisl. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Id aliquet lectus proin nibh nisl. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.

Nisl tincidunt eget nullam non nisl est sit amet facilisis. Sit amet cursus sit amet dictum sit amet justo donec. Sed felis eget velit aliquet sagittis id consectetur purus. Aenean et tortor at risus viverra adipiscing at. Tortor dignissim convallis aenean et tortor at risus. Faucibus purus in massa tempor nec. Arcu cursus vitae congue mauris rhoncus aenean. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Magna fermentum iaculis eu non diam. Blandit cursus risus at ultrices mi. Sit amet dictum sit amet. Quis lectus nulla at volutpat diam. Elementum eu facilisis sed odio morbi quis.`,
  };

  const handleBack = () => {
    // Navigate to previous project or go back to projects list
    console.log("Navigate back");
  };

  const handleNext = () => {
    // Navigate to next project
    console.log("Navigate next");
  };

  return (
    <div className="min-h-screen w-screen bg-white">
      {/* banner */}
      <div className="bg-[linear-gradient(0deg,rgba(255,255,255,0.05)_0%,rgba(185,165,144,0.740859)_0%,#9F8467_100%)] flex flex-col py-40 justify-center items-center">
        <div className="py-20 text-second font-bold text-9xl flex flex-col items-center justify-center gap-5">
          <h4>THIẾT KẾ SANG TRỌNG</h4>
          <p className="font-extralight text-2xl max-w-6xl text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
            atque sapiente quas blanditiis magni esse nemo odit amet aspernatur
            modi ipsum illo culpa ut quibusdam vel, non rem libero nulla!{" "}
          </p>
        </div>
        <div className="w-9/12 h-[700px] m-auto">
          <img src={Images.bannerHomeImage} alt="" className="w-full h-full" />
        </div>
      </div>

      {/* body */}
      <div className="container mx-auto px-4 py-12">
        {/* First Row: Description (Blue) + Project Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
          {/* Left: Project Description with blue background */}
          <div className="col-span-2">
            <ProjectDescriptionSection
              description={projectData.shortDescription}
            />
          </div>

          {/* Right: Project Info */}
          <div className="col-span-1">
            <ProjectInfo
              projectType={projectData.type}
              location={projectData.location}
              duration={projectData.duration}
              budget={projectData.budget}
              address={projectData.address}
            />
          </div>
        </div>

        {/* Second Row: Gallery Images */}
        <div className="mb-8">
          <ProjectGallery images={projectData.galleryImages} />
        </div>

        {/* Third Row: Detailed Description */}
        <div className="mb-8">
          <ProjectDescription description={projectData.longDescription} />
        </div>

        {/* Navigation */}
        <div className="py-8">
          <ProjectNavigation
            onBack={handleBack}
            onNext={handleNext}
            backImage={Images.bannerAboutUsImage}
            nextImage={Images.bannerHomeImage}
            hasPrevious={true}
            hasNext={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailView;

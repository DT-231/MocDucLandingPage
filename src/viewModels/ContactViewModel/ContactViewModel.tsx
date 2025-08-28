import Images from "@assets/Images";
import type { ContactViewModelType } from "@/models/ContactViewModelType/ContactViewModelType";
import Button from "@components/Button/Button";

const ContactViewModel: React.FC<ContactViewModelType> = ({
  title,
  textBtn,
  to,
  href,
  classNameBtn,
}) => {
  return (
    <section
      className="relative min-h-[300px] sm:min-h-[400px] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 font-primary"
      style={{
        backgroundImage: ` url('${Images.bannerHomeImage}')`,
      }}
    >
      <div className="container bg-[#F6FBF6CC] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center rounded-lg">
        {/* Main Content */}
        <div className="w-full max-w-6xl flex flex-col items-center gap-6 md:gap-10">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary text-center leading-tight">
            {title}
          </h2>

          {/* CTA Button */}
          <Button
            to={to}
            href={href}
            primary={true}
            classNames={` px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ${classNameBtn}`}
          >
            {textBtn}
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 border-2 border-amber-400 opacity-30 rotate-45"></div>
        <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-10 h-10 sm:w-16 sm:h-16 border-2 border-white opacity-20 rotate-12"></div>
      </div>
    </section>
  );
};

export default ContactViewModel;

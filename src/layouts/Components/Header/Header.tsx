import HeaderContextJson from "@data/headerContext.json";
import Images from "@assets/Images";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHeaderData, useCompanyData } from "@viewModels/hooks/useWordPressData";

const Header = () => {
  // Lấy dữ liệu header từ WordPress Customizer
  const { headerData } = useHeaderData();
  const { companyData } = useCompanyData();
  
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Normalize menu items để có cùng structure với type safety
  const normalizeMenuItems = () => {
    if (headerData?.menu_items && Array.isArray(headerData.menu_items) && headerData.menu_items.length > 0) {
      return headerData.menu_items.map((item: { label: string; href: string }) => ({
        title: item.label,
        path: item.href
      }));
    }
    return HeaderContextJson;
  };
  
  const menuItems = normalizeMenuItems();
  const logoUrl = headerData?.logo_url || '';
  const companyName = companyData?.name || 'Mộc Đức';

  useEffect(() => {
    // Update current path when location changes
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Handle scroll to change header background
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Change background after scrolling 50px
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (path: string) => {
    setCurrentPath(path);
    setIsMobileMenuOpen(false); // Close mobile menu when nav item is clicked
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`
            
            header py-1 fixed top-0 left-0 right-0 z-50 flex items-center justify-between font-primary px-4 md:px-8 transition-all duration-300 
         
            ${
              !isScrolled
                ? "bg-transparent"
                : "bg-[linear-gradient(0deg,rgba(255,255,255,0.05)_0%,rgba(185,165,144,0.740859)_0%,#9F8467_100%)]"
            } 
            `}
    >
      {}
      {/* logo */}
      <div className="logo-container flex-shrink-0">
        <img
          src={logoUrl || Images.logoImageNoBackground}
          alt={companyName || "Mộc Đức Furniture"}
          className={`logo w-[120px] transition-all duration-300 ${
            isScrolled ? "lg:w-[150px]" : "lg:w-[200px]"
          }`}
        />
      </div>

      {/* Desktop navbar */}
      <nav className="navbar hidden lg:flex flex-1 justify-end">
        <ul
          className={`nav-list flex gap-4 xl:gap-8 text-lg font-normal transition-colors duration-300 ${
            isScrolled ? "text-gray-700" : "text-white/50"
          }`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`nav-link relative py-2 px-3 transition-all duration-300 ease-in-out hover:text-white
                                    after:content-[''] after:absolute after:bottom-0 after:left-1/2 
                                    after:w-0 after:h-0.5 after:bg-current after:transition-all 
                                    after:duration-300 after:ease-in-out after:transform after:-translate-x-1/2
                                    
                                    ${
                                      currentPath === item.path
                                        ? `after:w-full text-white`
                                        : ""
                                    }
                                    `}
                // `${ isScrolled ? "text-primary" :"text-white"}` : ''
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

 

      {/* Mobile menu button */}
      <button
        className={`lg:hidden flex flex-col justify-center items-center w-8 h-8 transition-colors duration-300 ${
          isScrolled ? "text-gray-700" : "text-white"
        }`}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 my-1 ${
            isMobileMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-screen w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
          <button
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`block py-3 px-4 rounded-md transition-colors duration-300 hover:bg-gray-100 ${
                    currentPath === item.path
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          
        
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30  z-40"
          onClick={toggleMobileMenu}
          aria-label="Close menu overlay"
        ></div>
      )}
    </header>
  );
};

export default Header;

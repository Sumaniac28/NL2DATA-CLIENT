import { useState, type FC, type ReactElement } from "react";

interface IHeader {
  onOpenModal: (type: string) => void;
}

const Header: FC<IHeader> = ({ onOpenModal }): ReactElement => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="p-3 flex justify-between items-center fixed top-0 left-0 right-0 z-20 shadow-md bg-[#000000] text-[#AEB4C0]">
      <a href="#" className="flex gap-2 items-center flex-1">
        <span className="font-orbitron text-lg font-medium font-display text-[#FFFFFF]">
          NL2DATA
        </span>
      </a>

      <div className="hidden lg:flex gap-12">
        {["Features", "How It Works", "Testimonials", "FAQ", "Contact"].map(
          (item) => (
            <a
              key={item}
              href="#"
              className="font-medium hover:text-[#21C1D6] transition-colors duration-200"
            >
              {item}
            </a>
          )
        )}
      </div>

      <div className="hidden lg:flex flex-1 justify-end gap-4">
        <button
          onClick={() => onOpenModal("login")}
          className="font-medium flex items-center text-white transition-colors duration-200 hover:text-[#21C1D6] cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => onOpenModal("signup")}
          className="flex gap-2 items-center border border-[#EAB308] px-6 py-2 rounded-lg transition-all duration-300 hover:border-[#FACC15] hover:bg-[#1E1E1E] group cursor-pointer"
        >
          <span className="font-display font-medium text-white group-hover:text-[#FACC15]">
            Get Started
          </span>
          <i className="fa-solid fa-arrow-right text-[#EAB308] transform transition-transform duration-300 group-hover:translate-x-1"></i>
        </button>
      </div>

      <button className="p-2 lg:hidden" onClick={toggleMenu}>
        <i className="fa-solid fa-bars text-[#FFFFFF]"></i>
      </button>

      {menuOpen && (
        <div className="fixed z-10 md:hidden bg-[#000000] inset-0 p-3">
          <div className="flex justify-between items-center">
            <a href="#" className="flex gap-2 items-center">
              <span className="text-lg font-medium font-display text-[#FFFFFF]">
                NL2DATA
              </span>
            </a>
            <button className="p-2 md:hidden" onClick={toggleMenu}>
              <i className="fa-solid fa-xmark text-[#FFFFFF]"></i>
            </button>
          </div>

          <div className="mt-6">
            {["Features", "How it works", "Testimonials", "FAQ", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="font-medium m-3 p-3 block rounded-lg text-[#AEB4C0] hover:text-[#21C1D6] hover:bg-[#1AA8BD] transition-all duration-200"
                >
                  {item}
                </a>
              )
            )}

            <button
              onClick={() => {
                onOpenModal("login");
                toggleMenu();
              }}
              className="font-medium m-3 p-3 block rounded-lg text-[#AEB4C0] hover:text-[#21C1D6] hover:bg-[#1AA8BD] transition-all duration-200 cursor-pointer"
            >
              Login
            </button>
          </div>

          <div className="h-[1px] bg-[#AEB4C0] my-4"></div>

          <button
            onClick={() => {
              onOpenModal("get-started");
              toggleMenu();
            }}
            className="w-full flex gap-2 items-center px-6 py-4 rounded-lg border border-[#EAB308] hover:bg-[#1AA8BD] transition-all duration-300 group cursor-pointer"
          >
            <span className="text-white group-hover:text-[#FACC15]">
              Get Started
            </span>
            <i className="fa-solid fa-arrow-right text-[#EAB308] transform transition-transform duration-300 group-hover:translate-x-1"></i>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;

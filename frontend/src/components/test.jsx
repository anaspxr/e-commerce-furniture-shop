import { useEffect, useState } from "react";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { navLinks } from "../../constants";
import MobileNavLinks from "./MobileNavLinks";
import NavLink from "./NavLink";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(null);
  useEffect(() => {
    const scrollAtive = () => {
      setActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", scrollAtive);
    return () => window.removeEventListener("scroll", scrollAtive);
  }, [active]);
  return (
    <div
      className={` ${
        active ? "shadow-lg bg-Solitude" : ""
      } fixed top-0 left-0 w-full z-30`}
    >
      <div>
        <div
          className={` ${
            active ? "py-2 transition-all duration-300" : "py-4"
          } container px-2 mx-auto flex justify-between items-center`}
        >
          <div className="flex items-center gap-4">
            <HiMenuAlt1
              className="text-3xl cursor-pointer sm:hidden"
              onClick={() => {
                setToggle(true);
              }}
            />
            <div className="text-xl text-Teal uppercase tracking-wide font-bold">
              Bsedu
            </div>
          </div>
          <div className="sm:flex items-center hidden">
            {navLinks.map((navLink) => {
              return <NavLink key={navLink.id} {...navLink} />;
            })}
          </div>
          <button className="py-3 px-6 text-sm font-bold border border-solid rounded-lg border-gray">
            Sign Up
          </button>
          {toggle && (
            <div className="fixed top-0 left-0 w-96 h-full bg-Teal text-white flex flex-col items-center justify-center shadow-lg gap-8 py-8">
              {navLinks.map((navLink) => {
                return (
                  <MobileNavLinks
                    key={navLink.id}
                    {...navLink}
                    setToggle={setToggle}
                  />
                );
              })}
              <HiX
                className="absolute top-12 right-12 text-3xl cursor-pointer"
                onClick={(prev) => setToggle(!prev)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

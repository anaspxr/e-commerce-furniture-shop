import logo from "./assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt1, HiX, HiChevronDown } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from "./Button";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import SearchField from "./SearchField";

const menuItems = [
  {
    title: "All Categories",
    to: "/products",
  },
  {
    title: "Home Decor",
    to: "/products/homedecor",
  },
  {
    title: "Sofas & Seatings",
    to: "/products/sofas",
  },
  {
    title: "Kitchen & dining",
    to: "/products/dining",
  },
  {
    title: "Furnishing",
    to: "/products/furnishings",
  },
  {
    title: "Lightings",
    to: "/products/lightings",
  },
  {
    title: "mattresses",
    to: "/products/mattresses",
  },
];

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#menuButton")) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`${
        scrolled ? "shadow-lg  py-1 bg-stone-50" : "bg-white"
      }   fixed top-0 w-full flex justify-between items-center p-2 z-10 transition-[padding,shadow,background-color] duration-500`}
    >
      <div className="flex items-center">
        <Link to="/">
          <img className="md:h-20 h-12" src={logo} />
        </Link>
      </div>

      <div className="2xl:flex items-center gap-5 hidden text-orange-950">
        {menuItems.map((item, i) => (
          <NavLink
            end
            key={i}
            className="flex flex-col justify-center items-center"
            to={item.to}
          >
            {({ isActive }) => {
              //? for the active tab indicator
              return (
                <>
                  {item.title}
                  {isActive && (
                    <hr className="border-none rounded-sm h-1 bg-orange-900 w-5/6" />
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <SearchField />
        <DropDown />
        <div className="hidden sm:block">
          {currentUser ? (
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
        <div className="flex">
          <Link to="/cart">
            <MdOutlineShoppingCart className="text-3xl text-orange-900 hover:text-orange-700" />
          </Link>
          <div className="w-4 h-4 flex justify-center items-center text-sm -ml-4 -mt-1 rounded-full bg-orange-600 text-white">
            {Object.keys(cartItems).length}
          </div>
        </div>
        <HiMenuAlt1
          id="menuButton"
          onClick={() => {
            setOpen(true);
          }}
          className="text-3xl cursor-pointer md:hidden text-orange-900 hover:text-orange-700"
        />
      </div>
      <MobileHeader open={open} setOpen={setOpen} />
    </div>
  );
}

function MobileHeader({ open, setOpen }) {
  const { currentUser } = useContext(UserContext);
  return (
    <div
      className={`bg-stone-100 md:hidden shadow-md w-56 absolute top-0 right-0 h-screen transition-transform duration-500 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-2 h-16 items-center">
        <HiX
          onClick={() => setOpen(false)}
          className="text-3xl cursor-pointer text-orange-900 hover:text-orange-700"
        />
      </div>
      <div className="flex flex-col items-start text-orange-900 gap-2">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            className="flex flex-col justify-center items-center border-b-2 border-orange-800 w-full p-2 hover:bg-orange-200"
            to={item.to}
          >
            <>{item.title}</>
          </NavLink>
        ))}
        <div className="flex justify-center w-full">
          {currentUser ? (
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#categoryButton")) setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      id="categoryButton"
      className="hidden md:inline-block 2xl:hidden relative text-left "
    >
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-900 shadow-sm ring-1 ring-inset ring-stone-200 hover:bg-gray-50"
        >
          Categories
          <HiChevronDown className="-mr-1 h-5 w-5 text-gray-400" />
        </button>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"}
         absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 `}
      >
        <div className="py-1">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className="block px-4 py-2 text-sm text-orange-900 hover:bg-orange-50"
              role="menuitem"
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

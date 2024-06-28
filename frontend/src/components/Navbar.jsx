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
  const [toggle, setToggle] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-orange-100 flex justify-between items-center p-2  z-10">
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
      <div className="flex items-center gap-2">
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
        <Link to="/cart">
          <MdOutlineShoppingCart className="text-4xl text-orange-900 hover:text-orange-700" />
        </Link>
        <div className="w-5 h-5 flex justify-center items-center text-sm -mt-7 -ml-6 rounded-full bg-orange-600 text-white">
          {Object.keys(cartItems).length}
        </div>
        <HiMenuAlt1
          onClick={() => {
            setToggle(true);
          }}
          className="text-3xl cursor-pointer md:hidden text-orange-900 hover:text-orange-700"
        />
      </div>
      {toggle && <MobileHeader setToggle={setToggle} />}
    </div>
  );
}

function MobileHeader({ setToggle }) {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="bg-orange-100 md:hidden shadow-md w-56 absolute top-0 right-0 h-screen">
      <div className="flex justify-end p-2 h-16 items-center">
        <HiX
          onClick={() => setToggle(false)}
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
    document.addEventListener("click", () => {
      setIsOpen(false);
    });
  }, []);
  return (
    <div className="hidden md:inline-block 2xl:hidden relative text-left ">
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-900 shadow-sm ring-1 ring-inset ring-orange-200 hover:bg-gray-50"
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

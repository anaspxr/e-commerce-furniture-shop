import logo from "./assets/logo.png";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from "./Button";

const menuItems = [
  {
    title: "Furniture",
    to: "/furniture",
  },
  {
    title: "Home Decor",
    to: "/homedecor",
  },
  {
    title: "Sofas & Seatings",
    to: "/sofas",
  },
  {
    title: "Kitchen & dining",
    to: "/dining",
  },
];
export default function Navbar() {
  const [active, setActive] = useState(0);
  const [toggle, setToggle] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-orange-50 flex justify-between p-2 shadow-md z-10">
      <div className="flex items-center">
        <Link
          to="/"
          onClick={() => {
            setActive(null);
          }}
        >
          <img className="md:h-20 h-12" src={logo} />
        </Link>
      </div>
      <div className="md:flex items-center gap-3 hidden">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            className="flex flex-col justify-center items-center"
            to={item.to}
          >
            {({ isActive }) => {
              //? for the active tab indicator
              if (isActive && active !== i) {
                setActive(i);
              }
              return (
                <>
                  {item.title}
                  {active === i && (
                    <hr className="border-none rounded-sm h-1 bg-orange-900 w-5/6" />
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/cart">
          <MdOutlineShoppingCart className="text-4xl text-orange-900 hover:text-orange-700" />
        </Link>
        <div className="w-5 h-5 flex justify-center items-center text-sm -mt-7 -ml-6 rounded-full bg-orange-600 text-white">
          0
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
  return (
    <div className="bg-orange-300 md:hidden shadow-md w-56 absolute top-0 right-0 h-screen">
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
      </div>
    </div>
  );
}

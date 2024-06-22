import logo from "./assets/logo.png";
import cart from "./assets/cart.png";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
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

  const [active, setActive] = useState(0);

  return (
    <div className="flex justify-around p-2 shadow-md">
      <div className="flex items-center">
        <Link
          to="/"
          onClick={() => {
            setActive(null);
          }}
        >
          <img className="h-20" src={logo} />
        </Link>
      </div>
      <div className="flex items-center gap-3">
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
        <Link
          to="/login"
          className="w-20 border flex justify-center items-center border-orange-900 rounded-md hover:bg-orange-50 active:bg-orange-100"
        >
          Login
        </Link>
        <Link to="/cart">
          <img className="h-9" src={cart} />
        </Link>
        <div className="w-5 h-5 flex justify-center items-center text-sm -mt-7 -ml-5 rounded-full bg-orange-600 text-white">
          0
        </div>
      </div>
    </div>
  );
}

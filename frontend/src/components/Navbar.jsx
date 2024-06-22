import logo from "./assets/logo.png";
import cart from "./assets/cart.png";
import { useState } from "react";

export default function Navbar() {
  const menuItems = [
    {
      title: "Furniture",
      to: "/furniture",
    },
    {
      title: "Furniture",
      to: "/furniture",
    },
    {
      title: "Sofas & Seatings",
      to: "/furniture",
    },
    {
      title: "Kitchen & dining",
      to: "/furniture",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="flex justify-around p-2 shadow-md">
      <div className="flex items-center">
        <img className="h-20" src={logo} />
      </div>
      <ul className="flex items-center gap-3">
        {menuItems.map((item, i) => (
          <li
            onClick={() => {
              setActive(i);
            }}
            className="cursor-pointer flex flex-col justify-center items-center"
            key={i}
          >
            {item.title}

            {active === i && (
              <hr className="border-none rounded-sm h-1 bg-orange-900 w-5/6" />
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <button className="w-20 border border-orange-900 rounded-md hover:bg-orange-50 active:bg-orange-100">
          Login
        </button>
        <img className="h-9" src={cart} />
        <div className="w-5 h-5 flex justify-center items-center text-sm -mt-7 -ml-5 rounded-full bg-orange-600 text-white">
          0
        </div>
      </div>
    </div>
  );
}

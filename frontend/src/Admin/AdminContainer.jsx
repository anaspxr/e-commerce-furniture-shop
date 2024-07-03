import { useContext, useState } from "react";
import icon from "../components/assets/logo-small.png";
import { Link, useLocation } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { FaUsers, FaBagShopping } from "react-icons/fa6";
import {
  MdSpaceDashboard,
  MdLocalShipping,
  MdAdminPanelSettings,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { PiSignOutFill } from "react-icons/pi";
import { UserContext } from "../contexts/UserContext";

export default function Admin({ children }) {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", icon: <MdSpaceDashboard />, link: "admin" },
    { name: "Users", icon: <FaUsers />, link: "admin/users" },
    { name: "Products", icon: <FaBagShopping />, link: "admin/products" },
    { name: "Orders", icon: <MdLocalShipping />, link: "admin/orders" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(UserContext);
  return (
    <>
      <div className="flex items-center bg-slate-100 justify-between fixed top-0 z-50 w-full  border-b border-slate-200 px-3 py-3 lg:px-5 lg:pl-3 shadow-md">
        <div className="flex items-center justify-start rtl:justify-end">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            type="button"
            className="inline-flex items-center p-2 text-sm text-slate-950 hover:text-slate-800 rounded-lg sm:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 "
          >
            <RiMenu2Line className="text-3xl hover:text-slate-600" />
          </button>
          <Link to="/" className="flex ms-2 md:me-24">
            <img src={icon} className="h-8 me-3" alt="FlowBite Logo" />
            <span className="text-orange-950 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
              Comfort Craft
            </span>
          </Link>
        </div>
        <div className="flex items-center ms-3">
          <MdAdminPanelSettings className="text-4xl text-slate-900 " />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          !isOpen && "-translate-x-full"
        }  bg-slate-100 border-r border-slate-200 sm:translate-x-0`}
      >
        <div className="h-full px-3 overflow-y-auto ">
          <p className="text-slate-900 text-center text-xl font-semibold sm:text-2xl border-b py-2 mb-5">
            Admin
            <MdKeyboardDoubleArrowLeft
              onClick={() => {
                setIsOpen(false);
              }}
              className="cursor-pointer float-right text-2xl hover:bg-slate-200 rounded-md hover:text-slate-600 sm:hidden"
            />
          </p>
          <ul className="space-y-2 font-medium">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className={`${
                    location === item.link && "bg-white"
                  } flex items-center p-2 text-slate-950 rounded-lg  hover:bg-slate-200  group`}
                >
                  {item.icon}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
            <li
              className="cursor-pointer flex items-center p-2 text-slate-950 rounded-lg  hover:bg-slate-200  group"
              onClick={logout}
            >
              <PiSignOutFill />
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="sm:ml-64 mt-20 m-5 p-4">{children}</div>
    </>
  );
}

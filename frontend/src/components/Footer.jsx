import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
export default function Footer() {
  return (
    <div>
      <footer className="bg-orange-800 text-white p-3 text-center">
        <div className="flex items-center flex-col">
          <Link to="/">
            <img className="max-w-52" src={logo} alt="Furnify" />
          </Link>
          <p>One stop solution for all your furniture needs</p>
        </div>
        <div>
          <h2 className="text-2xl">Contact Us</h2>
          <p>Address: 1234, Furnify Street, Kerala, India</p>
          <p>Email: furnify@mail.com | Phone: 1234567890</p>
          <p>&copy; 2021 Furnify</p>
        </div>
      </footer>
    </div>
  );
}

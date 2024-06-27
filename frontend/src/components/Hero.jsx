import Button from "./Button";
import heroImage from "./assets/hero.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-around items-center p-5 gap-2">
      <div>
        <h1 className="md:text-6xl text-4xl text-orange-800">Furnify</h1>
        <p className="text-lg text-orange-900">
          One stop solution for all your furniture needs
        </p>
        <p className="text-orange-900">
          Discover Elegant and affordable furniture for every room in your
          house.
        </p>
        <Link to="/products">
          <div className=" mt-10">
            <Button>Shop Now</Button>
          </div>
        </Link>
        <Link to="/products">
          <div className=" mt-10">
            <Button>Browse Categories</Button>
          </div>
        </Link>
      </div>

      <img src={heroImage} alt="" />
    </div>
  );
}

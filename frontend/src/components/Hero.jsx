import Button from "./Button";
import heroImage from "./assets/hero-min.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-around items-center p-5 gap-2 2xl:px-52">
      <div>
        <h1 className="md:text-6xl text-4xl xl:text-8xl text-orange-800">
          Furnify
        </h1>
        <p className="text-lg text-orange-900">
          One stop solution for all your furniture needs
        </p>
        <p className="text-orange-900">
          Discover Elegant and affordable furniture for every room in your
          house.
        </p>
        <div className="flex gap-5 flex-wrap mt-5">
          <Link to="/products">
            <Button>Shop Now</Button>
          </Link>
          <Link to="/products">
            <Button>Browse Categories</Button>
          </Link>
        </div>
      </div>

      <img src={heroImage} alt="" />
    </div>
  );
}

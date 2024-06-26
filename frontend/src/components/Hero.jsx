import Button from "./Button";
import heroImage from "./assets/hero.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-around items-center p-5 gap-2 h-svh">
      <div>
        <h1 className="md:text-6xl text-4xl text-orange-800">
          Welcome To Furnify..!!
        </h1>
        <Link to="/products">
          <div className=" mt-10">
            <Button>Shop Now..!!</Button>
          </div>
        </Link>
      </div>

      <img src={heroImage} alt="" />
    </div>
  );
}

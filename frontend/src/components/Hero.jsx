import heroImage from "./assets/hero.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-around items-center m-5  p-3 gap-2">
      <div>
        <h1 className="md:text-6xl text-4xl text-orange-800">
          Welcome To Furnify..!!
        </h1>
        <Link to="/furniture">
          <div className="mt-10 text-white bg-orange-800 w-fit p-2 rounded-xl hover:bg-opacity-90">
            Shop Now..!!
          </div>
        </Link>
      </div>
      <div>
        <img src={heroImage} alt="" />
      </div>
    </div>
  );
}

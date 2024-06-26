import { Link } from "react-router-dom";
import Button from "./Button";

export default function Item({ product }) {
  function calculateDiscountPrice(oldPrice, discountPrice) {
    return Math.floor(((oldPrice - discountPrice) / oldPrice) * 100);
  }

  return (
    <div className="flex flex-col justify-between bg-white overflow-hidden ">
      <Link to={`/products/${product.id}`}>
        <img
          className="top-0 left-0 transition-transform duration-500 hover:scale-105 w-full h-60 object-cover"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="p-3">
        <Link to={`/products/${product.id}`} className="text-xl">
          {product.name}
        </Link>
        <div className=" flex flex-wrap gap-5">
          <span className="text-orange-500"> ₹{product.discountPrice}</span>
          <span className="text-gray-400 line-through">
            ₹{product.oldPrice}
          </span>
        </div>
        <p className="text-green-800">
          {calculateDiscountPrice(product.oldPrice, product.discountPrice)}% off
        </p>

        <Button>Add to Cart</Button>
      </div>
    </div>
  );
}

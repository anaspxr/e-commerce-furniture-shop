import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

export default function Item({ product }) {
  const { addToCart } = useContext(CartContext);

  function calculateDiscountPrice(oldPrice, discountPrice) {
    return Math.floor(((oldPrice - discountPrice) / oldPrice) * 100);
  }

  return (
    <div className="flex flex-col justify-between bg-white shadow-2xl overflow-hidden rounded-md">
      <Link to={`/products/${product.id}`}>
        <img
          className="top-0 left-0 transition-transform duration-500 hover:scale-105 w-full h-60 object-cover"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="p-3">
        <Link
          to={`/products/${product.id}`}
          className="text-xl text-orange-900 hover:text-orange-600"
        >
          {product.name}
        </Link>
        <div className=" flex flex-wrap gap-5">
          <span className="text-orange-600"> ₹{product.discountPrice}</span>
          <span className="text-gray-400 line-through">
            ₹{product.oldPrice}
          </span>
        </div>
        <p className="text-green-800">
          {calculateDiscountPrice(product.oldPrice, product.discountPrice)}% off
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              addToCart(product.id);
            }}
            className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm"
          >
            Add to Cart
          </button>
          <button className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

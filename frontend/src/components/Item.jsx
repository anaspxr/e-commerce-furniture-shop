import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useContext, useState } from "react";

export default function Item({ product }) {
  const navigate = useNavigate();
  const { addToCart, setBuyItems } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  function calculateDiscountPrice(oldPrice, discountPrice) {
    return Math.floor(((oldPrice - discountPrice) / oldPrice) * 100);
  }

  function handleBuyNow(id) {
    setBuyItems({ [id]: 1 });
    navigate("/checkout");
  }

  return (
    <div className="flex flex-col  bg-white shadow-2xl overflow-hidden rounded-md">
      <Link to={`/products/${product.id}`}>
        <img
          className="top-0 left-0 transition-transform duration-500 hover:scale-105 w-full h-32 lg:h-60 object-cover"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="flex flex-col justify-between h-full p-3">
        <div>
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
            {calculateDiscountPrice(product.oldPrice, product.discountPrice)}%
            off
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              if (added) {
                navigate("/cart");
              } else {
                setAdded(true);
                addToCart(product.id);
              }
            }}
            className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm"
          >
            {added ? "Go to Cart" : "Add to Cart"}
          </button>
          <button
            onClick={() => {
              handleBuyNow(product.id);
            }}
            className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

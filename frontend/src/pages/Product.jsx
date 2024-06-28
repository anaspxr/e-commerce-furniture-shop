import { useParams } from "react-router-dom";
import { furnitureData } from "../components/assets/data";
import { RelatedProducts, Recommend } from "../components/Recommend";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const { setBuyItems, addToCart, cartItems } = useContext(CartContext);
  const { productID } = useParams();
  const navigate = useNavigate();
  const added = Object.keys(cartItems).includes(productID);
  const product = furnitureData.find((item) => {
    return item.id === productID;
  });

  function calculateDiscountPrice(oldPrice, discountPrice) {
    return Math.floor(((oldPrice - discountPrice) / oldPrice) * 100);
  }
  function handleBuyNow(id) {
    setBuyItems({ [id]: 1 });
    navigate("/checkout");
  }

  return (
    <>
      {!product ? (
        <h1 className="text-red-500 text-center text-xl ">
          Product not found!!
        </h1>
      ) : (
        <>
          <div className="p-10 ">
            <div className="flex justify-center items-center ">
              <img
                src={product.image}
                alt={product.name}
                className="h-60 md:h-96 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl text-orange-950 font-semibold">
                {product.name}
              </h1>
              <div className=" flex flex-wrap gap-5">
                <span className="text-orange-500">
                  {" "}
                  ₹{product.discountPrice}
                </span>
                <span className="text-gray-400 line-through">
                  ₹{product.oldPrice}
                </span>
              </div>
              <p className="text-green-800">
                {calculateDiscountPrice(
                  product.oldPrice,
                  product.discountPrice
                )}
                % off
              </p>
              <p className="text-lg font-semibold text-orange-950">
                {product.description}
              </p>
            </div>
            <div className="flex justify-center gap-10 mt-5">
              <button
                onClick={() => {
                  added ? navigate("/cart") : addToCart(productID);
                }}
                className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300"
              >
                {added ? "Go to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => {
                  handleBuyNow(productID);
                }}
                className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="bg-orange-100 p-2 sm:p-4">
            <h1 className="text-2xl text-orange-950 font-semibold mt-10">
              Related Products
            </h1>
            <RelatedProducts product={product} />
          </div>
          <div className="p-2 sm:p-4">
            <h1 className="text-2xl text-orange-950 font-semibold mt-10">
              You may also like..
            </h1>
            <Recommend />
          </div>
        </>
      )}
    </>
  );
}

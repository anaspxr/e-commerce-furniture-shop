import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { furnitureData } from "../components/assets/data";

export default function Cart() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="p-5">
      <h1 className="text-3xl text-orange-900 text-center mb-10">Cart</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        {Object.keys(cartItems).map((productID) => {
          const product = furnitureData.find((item) => item.id === productID);

          return (
            <>
              {!product ? (
                ""
              ) : (
                <div
                  key={productID}
                  className="flex flex-col justify-between bg-white overflow-hidden "
                >
                  <img
                    className="top-0 left-0 transition-transform duration-500 hover:scale-105 w-full h-60 object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="p-3">
                    <h1 className="text-xl">{product.name}</h1>
                    <div className=" flex flex-wrap gap-5">
                      <span className="text-orange-500">
                        {" "}
                        ₹{product.discountPrice}
                      </span>
                      <span className="text-gray-400 line-through">
                        ₹{product.oldPrice}
                      </span>
                    </div>
                    <button className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300">
                      Remove from Cart
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

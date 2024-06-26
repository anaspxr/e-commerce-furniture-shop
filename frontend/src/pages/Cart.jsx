import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { furnitureData } from "../components/assets/data";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  return (
    <div className="p-5">
      <h1 className="text-3xl text-orange-900 text-center mb-10">Cart</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        {Object.keys(cartItems).map((productID) => {
          const product = furnitureData.find((item) => item.id === productID);
          const total = product.discountPrice * cartItems[productID];
          const oldTotal = product.oldPrice * cartItems[productID];
          return (
            <div key={productID}>
              {!product ? (
                ""
              ) : (
                <div
                  key={productID}
                  className="flex flex-col justify-between bg-white overflow-hidden "
                >
                  <img
                    className=" w-full h-60 object-cover"
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-xl">{product.name}</h1>
                      <div className=" flex flex-wrap gap-5">
                        <span className="text-orange-500">
                          ₹{product.discountPrice}
                        </span>
                        <span className="text-gray-400 line-through">
                          ₹{product.oldPrice}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-2 mt-2">
                        <p>Quantity: {cartItems[productID]} </p>
                        <button
                          onClick={() => {
                            addToCart(productID);
                          }}
                          className="bg-orange-200 h-6 w-6 rounded-md hover:bg-orange-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            removeFromCart(productID);
                          }}
                          className="bg-orange-200 h-6 w-6 rounded-md hover:bg-orange-300"
                        >
                          -
                        </button>
                      </div>
                      <div className=" flex flex-wrap gap-5">
                        <span className="text-green-500">Total: ₹{total}</span>
                        <span className="text-gray-400 line-through">
                          ₹{oldTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

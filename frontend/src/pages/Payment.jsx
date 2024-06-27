import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { furnitureData } from "../components/assets/data";

export default function Payment() {
  useEffect(() => {
    if (Object.keys(buyItems).length === 0) {
      navigate("/cart");
    }
  });

  const navigate = useNavigate();
  const { buyItems } = useContext(CartContext);

  const totalAmount = Object.keys(buyItems).reduce((acc, productID) => {
    const product = furnitureData.find((item) => item.id === productID);
    return acc + Number(product.discountPrice) * Number(buyItems[productID]);
  }, 0);
  const oldAmount = Object.keys(buyItems).reduce((acc, productID) => {
    const product = furnitureData.find((item) => item.id === productID);
    return acc + Number(product.oldPrice) * Number(buyItems[productID]);
  }, 0);

  return (
    <div className="text-orange-800">
      <h1 className="text-2xl text-center text-orange-900 my-5">Payment</h1>
      <div className="m-auto max-w-3xl flex flex-wrap gap-3 p-2 justify-center">
        {Object.keys(buyItems).map((productID) => {
          const product = furnitureData.find((item) => item.id === productID);
          const total = product.discountPrice * buyItems[productID];
          return (
            <div key={productID} className="shadow-md p-1 rounded-sm">
              <div
                key={productID}
                className="flex flex-col justify-between bg-white overflow-hidden "
              >
                <img
                  className="w-52 h-32 object-cover"
                  src={product.image}
                  alt={product.name}
                />
                <div>
                  <p>{product.name}</p>
                  <p> Quantity: {buyItems[productID]}</p>
                  <p className="text-green-500">Total: ₹{total}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr className="border-2 mx-16" />
      <div className="m-auto flex justify-center gap-10 p-10 max-w-3xl">
        <div className="text-gray-600">
          <p>Retail Total:{oldAmount}</p>
          <p>Discount:{oldAmount - totalAmount}</p>
          <p>Delivery Charges: ₹200</p>
          <p className="text-green-500">Total:{totalAmount + 200} </p>
        </div>

        <div className="flex gap-x-5 flex-wrap">
          <div className="mt-5">
            <p className="text-green-500 text-xl">
              Total: ₹{totalAmount + 200}
            </p>
            <p className="text-gray-400 line-through">₹{oldAmount} </p>
          </div>
          <button className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

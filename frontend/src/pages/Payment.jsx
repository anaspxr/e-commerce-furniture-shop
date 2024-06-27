import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const { buyItems } = useContext(CartContext);
  useEffect(() => {
    if (Object.keys(buyItems).length === 0) {
      navigate("/cart");
    }
  });

  console.log(buyItems);
  return (
    <div>
      <h1 className="text-2xl text-center my-5">Payment</h1>
      {/* <div className="flex justify-center">
        <div className="w-96 p-5 bg-orange-50 rounded-md shadow-md">
          <h2 className="text-xl text-center">Order Summary</h2>
          <div className="flex justify-between my-2">
            <p>Subtotal</p>
            <p>${cart.total}</p>
          </div>
          <div className="flex justify-between my-2">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between my-2">
            <p>Total</p>
            <p>${cart.total}</p>
          </div>
          <button className="w-full bg-orange-700 text-white p-2 rounded-md my-2">
            Proceed to Payment
          </button>
        </div>
      </div> */}
    </div>
  );
}

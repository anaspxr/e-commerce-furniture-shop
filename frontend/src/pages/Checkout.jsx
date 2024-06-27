import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { furnitureData } from "../components/assets/data";
import { useFormik } from "formik";
import { addressSchema } from "../schemas/userScheme";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Checkout() {
  useEffect(() => {
    if (Object.keys(buyItems).length === 0) {
      navigate("/cart");
    }
  });

  const navigate = useNavigate();
  const { buyItems, setBuyItems, setCartItems } = useContext(CartContext);
  const [progress, setProgress] = useState("items");
  const [address, setAddress] = useState({});

  const totalAmount = Object.keys(buyItems).reduce((acc, productID) => {
    const product = furnitureData.find((item) => item.id === productID);
    return acc + Number(product.discountPrice) * Number(buyItems[productID]);
  }, 0);
  const oldAmount = Object.keys(buyItems).reduce((acc, productID) => {
    const product = furnitureData.find((item) => item.id === productID);
    return acc + Number(product.oldPrice) * Number(buyItems[productID]);
  }, 0);

  return (
    <div className="text-orange-800 p-5">
      <h1 className="text-2xl text-center text-orange-900 my-5">Checkout</h1>
      <div className="max-w-3xl m-auto">
        <IoMdArrowRoundBack
          onClick={() => {
            if (progress === "address") {
              setProgress("items");
            } else if (progress === "payment") {
              setProgress("address");
            }
          }}
          className={`text-xl cursor-pointer ${
            progress === "items" && "hidden"
          }`}
        />
      </div>
      {progress === "items" && (
        <Items buyItems={buyItems} setBuyItems={setBuyItems} />
      )}
      {progress === "address" && <Address setAddress={setAddress} />}
      {progress === "payment" && <Payment items={buyItems} address={address} />}
      <hr className="border-2 mx-16" />
      <div className="m-auto flex justify-between gap-5 p-10 max-w-3xl items-center">
        <div className="text-gray-600">
          <p>Retail Total:{oldAmount}</p>
          <p>Discount:{oldAmount - totalAmount}</p>
          <p>Delivery Charges: ₹200</p>
          <p className="text-green-500">Total:{totalAmount + 200} </p>
        </div>

        <div className="flex gap-x-5 flex-col">
          <div className="mt-5">
            <p className="text-green-500 text-xl">
              Total: ₹{totalAmount + 200}
            </p>
            <p className="text-gray-400 line-through">₹{oldAmount} </p>
          </div>
          {progress === "items" && (
            <button
              onClick={() => {
                setProgress("address");
              }}
              className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs"
            >
              Confirm items
            </button>
          )}
          {progress === "address" && (
            <button
              onClick={() => {
                setProgress("payment");
              }}
              disabled={Object.keys(address).length === 0}
              className="disabled:bg-opacity-50 bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs disabled:cursor-not-allowed"
            >
              Proceed to Payment
            </button>
          )}
          {progress === "payment" && (
            <button
              onClick={() => {
                alert("Payment Successful");
                setCartItems({});
                setBuyItems({});
                navigate("/");
              }}
              disabled={Object.keys(address).length === 0}
              className="disabled:bg-opacity-50 bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs disabled:cursor-not-allowed"
            >
              Pay ₹{totalAmount + 200}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Items({ buyItems, setBuyItems }) {
  return (
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
                <p>
                  Quantity: {buyItems[productID]}{" "}
                  <button
                    onClick={() => {
                      setBuyItems({
                        ...buyItems,
                        [productID]: buyItems[productID] + 1,
                      });
                    }}
                    className="bg-orange-200 h-7 w-7 rounded-md mr-1 hover:bg-orange-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      if (buyItems[productID] === 1) {
                        const newBuyItems = { ...buyItems };
                        delete newBuyItems[productID];
                        setBuyItems(newBuyItems);
                        return;
                      }
                      setBuyItems({
                        ...buyItems,
                        [productID]: buyItems[productID] - 1,
                      });
                    }}
                    className="bg-orange-200 h-7 w-7 rounded-md hover:bg-orange-300"
                  >
                    -
                  </button>
                </p>
                <p className="text-green-500">Total: ₹{total}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Address({ setAddress }) {
  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      },
      validationSchema: addressSchema,
      onSubmit: (values) => {
        setAddress(values);
        setSubmitted(true);
      },
    });

  const fields = ["name", "address", "city", "state", "pincode", "phone"];

  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <h1 className="text-xl text-center text-orange-900">Address</h1>
      <div className="m-auto max-w-3xl p-2">
        <form className="flex flex-col gap-2">
          {fields.map((field) => (
            <div key={field}>
              <label htmlFor={field}>{field.toUpperCase()}</label>
              <input
                className={`w-full p-2 my-2 border rounded-sm ${
                  errors[field] && touched[field] && " border border-red-500"
                }`}
                id={field}
                type="text"
                placeholder={field}
                name={field}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values[field]}
              />
              {errors[field] && touched[field] && (
                <p className="text-red-500">{errors[field]}</p>
              )}
            </div>
          ))}
        </form>
        <button
          disabled={submitted}
          type="submit"
          onClick={handleSubmit}
          className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit disabled:bg-opacity-70 "
        >
          {submitted ? "Address confirmed" : "Confirm"}
        </button>
      </div>
    </div>
  );
}

function Payment({ items, address }) {
  return (
    <div className="m-auto max-w-3xl p-5 text-orange-900">
      <h1 className="text-2xl py-3">Payment</h1>
      <p className="text-xl">Your address</p>
      <p>{address.name}</p>
      <p>
        {address.address},{address.city},{address.state},{address.pincode}
      </p>
      <p>{address.phone}</p>
      <h3 className="text-xl py-5">Items</h3>
      <div className="flex flex-col gap-2">
        {Object.keys(items).map((productID) => {
          const product = furnitureData.find((item) => item.id === productID);
          return (
            <div key={productID} className="flex justify-between">
              <p>{product.name}</p>
              <p>Quantity: {items[productID]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { furnitureData } from "../components/assets/data";
import Button from "../components/Button";
import { RelatedProducts, Recommend } from "../components/Recommend";

export default function Product() {
  const { productID } = useParams();
  const product = furnitureData.find((item) => {
    return item.id === productID;
  });

  function calculateDiscountPrice(oldPrice, discountPrice) {
    return Math.floor(((oldPrice - discountPrice) / oldPrice) * 100);
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
              <img src={product.image} alt={product.name} className="h-96" />
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
              <Button>Add to Cart</Button>
              <Button>Buy Now</Button>
            </div>
          </div>
          <div className="bg-orange-100 p-5">
            <h1 className="text-2xl text-orange-950 font-semibold mt-10">
              Related Products
            </h1>
            <RelatedProducts product={product} />
          </div>
          <div className="p-5">
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

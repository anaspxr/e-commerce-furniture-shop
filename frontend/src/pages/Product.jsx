import { useParams } from "react-router-dom";
import { furnitureData } from "../components/assets/data";
import Button from "../components/Button";

export default function Product() {
  const { productID } = useParams();
  const product = furnitureData.find((item) => {
    return item.id == productID;
  });

  if (!product) {
    return (
      <h1 className="text-red-500 text-center text-xl ">Product not found!!</h1>
    );
  }

  return (
    <div className="p-10">
      <div className="flex justify-center items-center ">
        <img src={product.image} alt={product.name} className="h-96" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-orange-950 font-semibold">
          {product.name}
        </h1>
        <p className="text-lg font-semibold text-orange-900">
          ₹{product.price}
        </p>
        <p className="text-lg font-semibold text-orange-950">
          {product.description}
        </p>
      </div>
      <Button>Add to Cart</Button>
    </div>
  );
}

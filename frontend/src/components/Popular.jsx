import { furnitureData } from "./assets/data";
import Item from "./Item";

const popularProducts = [
  furnitureData[0], // Modern Sofa
  furnitureData[2], // Wooden Dining Table
  furnitureData[4], // Minimalist Coffee Table
  furnitureData[5], // Luxury Bed Frame
  furnitureData[6], // Compact Bookshelf
  furnitureData[9], // Recliner Sofa
];

export default function Popular() {
  return (
    <div className=" p-2">
      <h2 className="md:text-4xl text-3xl text-orange-900 my-5 text-center">
        Popular Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {popularProducts.map((item) => (
          <Item key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

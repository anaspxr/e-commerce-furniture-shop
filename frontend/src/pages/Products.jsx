import { furnitureData } from "../components/assets/data";
import Item from "../components/Item";
export default function Products({ category }) {
  const items =
    category === "furniture"
      ? furnitureData
      : furnitureData.filter((item) => item.category === category);

  return (
    <div className="bg-orange-200 p-2">
      <h2 className="md:text-4xl text-3xl text-orange-900 my-5 text-center">
        {category === "furniture" && "All Furnitures"}
        {category === "homedecor" && "Home & office decors"}
        {category === "sofas" && "Sofas & Seatings"}
        {category === "dining" && "Kitchen & Dining"}
        {category === "furnishings" && "Furnishings"}
        {category === "lightings" && "Lamps & Lightings"}
        {category === "mattresses" && "Mattresses"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Item key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

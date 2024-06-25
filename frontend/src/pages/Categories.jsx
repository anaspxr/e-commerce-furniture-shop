import { furnitureData } from "../components/assets/data";
import Item from "../components/Item";
export default function Categories({ category }) {
  const items = furnitureData.filter((item) => item.category === category);
  return (
    <div className="bg-orange-200 p-2">
      <h2 className="md:text-4xl text-3xl text-orange-900 my-5 text-center">
        {category}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

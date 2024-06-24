import { furnitureData } from "./assets/data";
import Item from "./Item";

export default function Popular() {
  return (
    <div>
      <h2 className="md:text-4xl text-3xl text-orange-900">Popular Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {furnitureData.map((item) => (
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
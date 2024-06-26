import { useEffect, useState } from "react";
import Item from "./Item";
import { furnitureData } from "./assets/data";

export function RelatedProducts({ product }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-5 mt-5">
      {furnitureData
        .filter((item) => item.category === product.category)
        .slice(0, 4)
        .map((item) => (
          <Item key={item.id} product={item} />
        ))}
    </div>
  );
}

export function Recommend() {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    //? Get 4 random items from the furnitureData
    const getRandomItems = () => {
      const shuffledItems = furnitureData.sort(() => 0.5 - Math.random());
      const selectedItems = shuffledItems.slice(0, 4);
      setRandomItems(selectedItems);
    };
    getRandomItems();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-5 mt-5">
      {randomItems.map((item) => (
        <Item key={item.id} product={item} />
      ))}
    </div>
  );
}

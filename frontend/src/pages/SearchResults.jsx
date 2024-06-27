import Item from "../components/Item";
import { furnitureData } from "../components/assets/data";
import { useParams } from "react-router-dom";

export default function SearchResults() {
  const { query } = useParams();
  console.log(query);
  const results = furnitureData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <div className="p-2 sm:p-3 lg:p-5 pb-10 bg-amber-100">
        <h2 className="md:text-4xl text-3xl text-orange-900 py-5 text-center">
          Search Results
        </h2>
        {results.length === 0 && (
          <h1 className="text-xl text-orange-900 my-5 text-center">
            No results found
          </h1>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {results.map((item) => (
            <Item key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useReducer, useState } from "react";
import useFetch from "../utils/useFetch";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
export default function ProductsPage() {
  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:3000/products");

  const [results, setResults] = useReducer(reducer, null);
  useEffect(() => {
    setResults({ type: "price", payload: 0 });
  }, [products]);

  function reducer(_, action) {
    if (action.type === "price") {
      switch (action.payload) {
        case 1:
          return products.filter((product) => product.discountPrice < 1500);
        case 2:
          return products.filter(
            (product) =>
              product.discountPrice >= 1500 && product.discountPrice < 3000
          );
        case 3:
          return products.filter(
            (product) =>
              product.discountPrice >= 3000 && product.discountPrice < 8000
          );
        case 4:
          return products.filter(
            (product) =>
              product.discountPrice >= 8000 && product.discountPrice < 15000
          );
        case 5:
          return products.filter((product) => product.discountPrice >= 15000);
        default:
          return products;
      }
    } else if (action.type === "category") {
      return products.filter((product) => product.category === action.payload);
    } else return products;
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl">Products</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <Filter setResults={setResults} />
      </div>
      {results && (
        <div className=" bg-slate-200 shadow-xl border p-2 rounded-md mt-5 grid lg:grid-cols-2 justify-center gap-y-2">
          {results.map((product) => (
            <div
              key={product.id}
              className="flex items-center my-1 border-b px-2 justify-between"
            >
              <div>
                <p className="text-xl font-semibold">{product.name}</p>
                <img
                  src={product.image}
                  alt="product image"
                  className="h-16 object-cover w-28 rounded-sm"
                />
                <p className="text-gray-500">Price: {product.discountPrice}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-slate-500 text-white px-2 py-1 rounded-md flex items-center gap-1">
                  Edit <FaRegEdit />
                </button>
                <button className="bg-red-700 text-white px-2 py-1 rounded-md flex items-center gap-1">
                  Delete <MdOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Filter({ setResults }) {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  function handleFilter() {
    if (category) {
      setResults({ type: "category", payload: category });
    } else if (price) {
      setResults({ type: "price", payload: price });
    }
  }

  return (
    <div className="bg-slate-200 shadow-xl border p-2 rounded-md mt-5 w-60">
      <p className="text-xl font-semibold">Filter</p>
      <div className="flex justify-between mb-1">
        <label htmlFor="category">Category:</label>
        <select
          className="rounded-md"
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="furniture">Furniture</option>
          <option value="homedecor">Home Decor</option>
          <option value="sofas">Sofas</option>
          <option value="mattresses">Mattresses</option>
          <option value="dining">Dining</option>
          <option value="lightings">Lightings</option>
          <option value="furnishings">Furnishings</option>
        </select>
      </div>
      <div className="flex justify-between mb-1">
        <label htmlFor="price">Price:</label>
        <select
          className="rounded-md "
          name="price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="0">All</option>
          <option value="1">Less than 1500</option>
          <option value="2">1500 - 3000</option>
          <option value="3">3000 - 8000</option>
          <option value="4">8000 - 15000</option>
          <option value="5">More than 15000</option>
        </select>
      </div>
      <button
        className="bg-slate-400 p-1 px-3 rounded-md w-full hover:bg-opacity-80"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
}

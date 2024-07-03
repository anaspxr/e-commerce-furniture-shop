import { useEffect, useReducer, useState } from "react";
import useFetch from "../utils/useFetch";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
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
    if (action.type === "category") {
      return products.filter((product) => product.category === action.payload);
    } else return products;
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl">Products</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {products && <Filter setResults={setResults} />}
      </div>
      {results && (
        <div className="mt-5 grid lg:grid-cols-2 gap-2">
          {results.map((product) => (
            <div
              key={product.id}
              className="bg-slate-100 flex items-center border-b justify-between p-1 px-10 rounded-sm"
            >
              <div>
                <p className="text-xl font-semibold">{product.name}</p>
                <img
                  src={product.image}
                  alt="product image"
                  className="h-16 object-cover w-28 rounded-sm"
                />
                <p className="text-gray-500">Price: {product.discountPrice}</p>
                <p className="text-gray-400">Old Price: {product.oldPrice} </p>
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  to={`/admin/products/${product.id}`}
                  className="bg-slate-500 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85"
                >
                  Edit <FaRegEdit />
                </Link>
                <button className="bg-red-700 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85">
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

  function handleFilter() {
    setResults({ type: "category", payload: category });
  }
  return (
    <div className="bg-slate-200 shadow-xl border p-2 rounded-md mt-5 w-60">
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
          <option value="homedecor">Home Decor</option>
          <option value="sofas">Sofas</option>
          <option value="mattresses">Mattresses</option>
          <option value="dining">Dining</option>
          <option value="lightings">Lightings</option>
          <option value="furnishings">Furnishings</option>
        </select>
      </div>
      <button
        className="bg-slate-500 text-white p-1 px-3 rounded-md w-full hover:bg-opacity-80"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
}

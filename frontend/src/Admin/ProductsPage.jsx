import useFetch from "../utils/useFetch";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
export default function ProductsPage() {
  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:3000/products");
  console.log(products, loading, error);
  return (
    <div>
      <h1 className="text-3xl">Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {products && (
        <div className=" bg-orange-100 p-2 rounded-md mt-5 grid lg:grid-cols-2 justify-center gap-y-2">
          {products.map((product) => (
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

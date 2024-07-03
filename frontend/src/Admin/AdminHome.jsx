import useFetch from "../utils/useFetch";
import { Link } from "react-router-dom";

export default function Admin() {
  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
  } = useFetch("http://localhost:3000/users");
  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetch("http://localhost:3000/products");

  return (
    <div>
      <div className="grid  md:grid-cols-2 gap-2">
        <Link
          to="/admin/users"
          className="bg-slate-300 px-2 py-5 rounded-md text-slate-700 hover:bg-opacity-80"
        >
          <p className="text-3xl mb-5">Users</p>
          {loadingUsers && <p>Loading...</p>}
          {errorUsers && <p>Error: {errorUsers.message}</p>}
          <p className="text-2xl">{users && users.length}</p>
        </Link>
        <Link
          to="/admin/products"
          className="bg-slate-300 px-2 py-5 rounded-md text-slate-700 hover:bg-opacity-80"
        >
          <p className="text-3xl mb-5">Products</p>
          {loadingProducts && <p>Loading...</p>}
          {errorProducts && <p>Error: {errorProducts.message}</p>}
          <p className="text-2xl">{products && products.length}</p>
        </Link>
        <Link
          to="/admin/products"
          className="bg-slate-300 px-2 py-5 rounded-md text-slate-700 hover:bg-opacity-80"
        >
          <p className="text-3xl mb-5">Orders</p>
          {loadingProducts && <p>Loading...</p>}
          {errorProducts && <p>Error: {errorProducts.message}</p>}
          <p className="text-2xl">{products && 5}</p>
        </Link>
      </div>
    </div>
  );
}

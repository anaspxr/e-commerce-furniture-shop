import useFetch from "../utils/useFetch";
import { Link } from "react-router-dom";

export default function UsersPage() {
  const {
    data: users,
    loading,
    error,
  } = useFetch("http://localhost:3000/users");
  return (
    <div className=" w-full">
      {error && <p>{error.message}</p>}
      {loading && <p>Loading...</p>}
      {users && <UsersList users={users} />}
    </div>
  );
}

function UsersList({ users }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Users</h1>
      <ul className="flex flex-col space-y-2 mt-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
          >
            <Link to={`/admin/users/${user.id}`} className="text-blue-500">
              {user.name}
            </Link>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

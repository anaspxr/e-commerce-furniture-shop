import { useState } from "react";
import useFetch from "../utils/useFetch";

export default function UsersPage() {
  const {
    data: users,
    loading,
    error,
  } = useFetch("http://localhost:3000/users");
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Users</h1>
      {selectedUser && (
        <div className="bg-slate-200 p-3 rounded-md text-slate-600">
          <h2 className="text-xl  font-semibold">{selectedUser.name}</h2>
          <p>{selectedUser.email}</p>
          <p>Orders: {JSON.stringify(selectedUser.orders, null, 2)}</p>
          <p>In cart: {JSON.stringify(selectedUser.cart)}</p>
        </div>
      )}
      {error && <p>{error.message}</p>}
      {loading && <p>Loading...</p>}
      {users && <UsersList users={users} setSelectedUser={setSelectedUser} />}
    </div>
  );
}

function UsersList({ users, setSelectedUser }) {
  return (
    <div>
      <ul className="flex flex-col justify-between space-y-2 mt-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between sm p-2 bg-gray-100 rounded-md"
          >
            <div>
              <p className="text-slate-500">{user.name}</p>
              <p className="text-slate-700">{user.email}</p>
              <p className="text-slate-600">
                Orders:{Object.keys(user.orders).length}
              </p>
            </div>
            <button
              className="text-blue-500 w-40 p-1 rounded-md hover:bg-slate-200"
              onClick={() => {
                window.scrollTo(0, 0);
                setSelectedUser(user);
              }}
            >
              See Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

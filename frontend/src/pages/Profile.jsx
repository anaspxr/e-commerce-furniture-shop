import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function Profile() {
  const { logout } = useContext(UserContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex flex-col items-center gap-4 mb-10 mt-10">
      <div className="bg-orange-200 p-5 w-96 flex flex-col items-center justify-center rounded-lg gap-5">
        <h1 className="text-2xl text-orange-900">User Details</h1>
        <p className="text-lg text-orange-900">Name: {currentUser.name}</p>
        <p className="text-lg text-orange-900">Email: {currentUser.email}</p>
        <span
          onClick={() => {
            logout();
          }}
        >
          <Button>Log out</Button>
        </span>
      </div>
    </div>
  );
}

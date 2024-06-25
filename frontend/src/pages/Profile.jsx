import { Navigate } from "react-router-dom";
import Button from "../components/Button";

export default function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  console.log(currentUser);
  return (
    <div className="flex flex-col items-center gap-4 mb-10">
      <div className="bg-orange-200 p-5 w-96 flex flex-col items-center justify-center rounded-lg gap-5">
        <h1 className="text-2xl text-orange-900">User Details</h1>
        <p className="text-lg text-orange-900">Name: {currentUser.name}</p>
        <p className="text-lg text-orange-900">Email: {currentUser.email}</p>
        <span
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.reload();
          }}
        >
          <Button>Log out</Button>
        </span>
      </div>
    </div>
  );
}

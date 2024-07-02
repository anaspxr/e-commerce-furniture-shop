import UsersList from "../../components/private/UsersList";
import useFetch from "../../utils/usefetch";

export default function UserDetails() {
  const { data, loading, error } = useFetch("http://localhost:3000/users");
  return (
    <div className=" w-full">
      {error && <p>{error.message}</p>}
      {loading && <p>Loading...</p>}
      {data && <UsersList users={data} />}
    </div>
  );
}

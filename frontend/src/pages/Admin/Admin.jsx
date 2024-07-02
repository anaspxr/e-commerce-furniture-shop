import UsersList from "../../components/private/UsersList";
import useFetch from "../../utils/usefetch";

export default function Admin() {
  const { data, loading, error } = useFetch("http://localhost:800/users");
  return (
    <div>
      <h1>Admin</h1>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {data && <UsersList users={data} />}
    </div>
  );
}

import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { furnitureData } from "./assets/data";
import { Link, useNavigate } from "react-router-dom";

export default function SearchField() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    if (value === "") {
      return;
    }
    navigate(`/search/${value}`);
  }

  function handleChange(e) {
    if (e.target.value === "") {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      furnitureData.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setValue(e.target.value);
  }

  useEffect(() => {
    document.addEventListener("click", () => {
      setSearchResults([]);
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch} className="flex">
        <input
          className="h-min rounded-md p-1 max-w-32 sm:w-40 md:w-72"
          placeholder="Search.."
          type="text"
          onChange={handleChange}
        />
        <button className="relative -m-2 -left-6 ">
          <HiSearch className="text-orange-700 text-2xl" />
        </button>
      </form>
      {searchResults.length > 0 && (
        <div className="h-52 overflow-y-scroll py-2 mt-2 rounded-md bg-orange-50 shadow-md absolute">
          {searchResults.map((item) => (
            <Link key={item.id} to={`/products/${item.id}`}>
              <p className="p-1 hover:bg-orange-100">{item.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

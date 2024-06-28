import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { furnitureData } from "./assets/data";
import { Link, useNavigate } from "react-router-dom";

export default function SearchField() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
    const handleClickOutside = (e) => {
      if (!e.target.closest("#search-container")) setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch} className="flex">
        <input
          id="search-container"
          className="h-7 p-1 w-full outline-none border-b border-orange-900 bg-transparent"
          placeholder="Search.."
          type="text"
          onChange={handleChange}
          onClick={() => setIsOpen(true)}
        />
        <button className="-m-7">
          <HiSearch className="text-orange-900 text-2xl" />
        </button>
      </form>
      {searchResults.length > 0 && isOpen && (
        <div className="h-52 overflow-y-scroll py-2 mt-2 rounded-md bg-stone-100 shadow-md absolute">
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

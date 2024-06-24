import { Link } from "react-router-dom";

export default function Item(props) {
  return (
    <div className="p-3 bg-orange-50">
      <Link to={`product/${props.id}`}>
        <img
          className="hover:scale-105 transition duration-200"
          src={props.image}
          alt={props.name}
        />
      </Link>
      <div>
        <h3 className="text-xl">{props.name}</h3>
        <div>₹{props.price}</div>
        <div>
          <p>{props.description}</p>
        </div>
        <button className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

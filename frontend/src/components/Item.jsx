import { Link } from "react-router-dom";
import Button from "./Button";

export default function Item(props) {
  return (
    <div className="flex flex-col justify-between bg-white overflow-hidden ">
      <Link to={`/products/${props.id}`}>
        <img
          className="top-0 left-0 transition-transform duration-500 hover:scale-105 w-full h-60 object-cover"
          src={props.image}
          alt={props.name}
        />
      </Link>
      <div className="p-3">
        <Link to={`/products/${props.id}`} className="text-xl">
          {props.name}
        </Link>
        <div>₹{props.price}</div>
        <div>
          <p className="hidden sm:block">{props.description}</p>
        </div>
        <Button>Add to Cart</Button>
      </div>
    </div>
  );
}

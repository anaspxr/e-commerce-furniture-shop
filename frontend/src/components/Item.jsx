import { Link } from "react-router-dom";
import Button from "./Button";

export default function Item(props) {
  return (
    <div className="p-3 bg-orange-50">
      <Link to={`product/${props.id}`}>
        <img
          className="hover:scale-105 transition duration-300"
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
        <Button>Add to Cart</Button>
      </div>
    </div>
  );
}

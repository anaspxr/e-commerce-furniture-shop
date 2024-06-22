export default function Item(props) {
  return (
    <div>
      <img src={props.image} />
      <p>{props.name}</p>
      <div>{props.price}</div>
      <div>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

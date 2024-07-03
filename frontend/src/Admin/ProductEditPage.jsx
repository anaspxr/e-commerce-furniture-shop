import { useParams } from "react-router-dom";

export default function ProductEditPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Edit Product {id}</h1>
    </div>
  );
}

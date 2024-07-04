import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { productSchema } from "../schemas/validationSchemas";
import { handleAdd } from "../utils/serverUtils";
import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";
export default function ProductEditPage() {
  const { id } = useParams();
  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:3000/products");

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (products) {
      const product = products.find((product) => product.id === id);
      if (product) {
        setPreview(product);
      }
    }
  }, [id, products]);
  return (
    <div>
      <p className="font-semibold text-2xl my-3 text-center">
        {id === "addproduct" ? "ADD NEW PRODUCT" : "EDIT PRODUCT"}
      </p>
      {loading && <p>Loading...</p>}
      {error && <p>network error..</p>}
      {preview && (
        <div>
          <p className="text-xl">Preview</p>
          <div className="flex flex-col items-center bg-slate-200 my-2 p-2">
            <div className="w-1/2 h-64 bg-slate-100 shadow-md rounded-md">
              <img
                src={preview.image}
                alt="product image"
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <p className="text-lg">{preview.name}</p>
            <p className="text-lg">{preview.discountPrice}</p>
            <p>Old Price: {preview.oldPrice}</p>
            <p>Description {preview.description}</p>
          </div>
          <button
            onClick={() => {
              handleAdd(preview, "products");
              setPreview(null);
            }}
          >
            Confirm Add Product
          </button>
        </div>
      )}
      <ProductForm id={id} setPreview={setPreview} />
    </div>
  );
}

function ProductForm({ setPreview }) {
  const initialValues = {
    name: "",
    oldPrice: "",
    discountPrice: "",
    category: "",
    image: "",
    description: "",
  };
  const { handleChange, handleSubmit, errors, touched, handleBlur } = useFormik(
    {
      initialValues: initialValues,
      validationSchema: productSchema,
      onSubmit: (values) => {
        const newProduct = { ...values, id: Date.now().toString() };
        setPreview(newProduct);
      },
    }
  );
  const formInputs = [
    { name: "name", title: "Product Name", type: "text" },
    { name: "oldPrice", title: "Old Price", type: "number" },
    { name: "discountPrice", title: "Discount Price", type: "number" },
    { name: "category", title: "Category", type: "text" },
    { name: "image", title: "Image", type: "text" },
    { name: "description", title: "Description", type: "text" },
  ];
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg m-auto flex flex-col bg-slate-200 text-slate-900 shadow-md p-5 rounded-sm"
    >
      {formInputs.map((fieldname) => {
        return (
          <div className="flex flex-col" key={fieldname.name}>
            <label htmlFor={fieldname.name}>{fieldname.title}</label>
            <input
              id={fieldname.name}
              name={fieldname.name}
              onBlur={handleBlur}
              onChange={handleChange}
              type={fieldname.type}
              className="p-1 border border-slate-400 rounded-sm"
            />
            <p className="text-red-600 text-sm">
              {errors[fieldname.name] &&
                touched[fieldname.name] &&
                errors[fieldname.name]}
            </p>
          </div>
        );
      })}
      <button
        type="submit"
        className="bg-slate-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit"
      >
        Show Preview
      </button>
    </form>
  );
}

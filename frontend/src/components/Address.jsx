import { useFormik } from "formik";
import { addressSchema } from "../schemas/userScheme";
import { useState } from "react";

export default function Address({ setAddress }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const initialValues = currentUser.address || {
    name: currentUser.name,
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  };
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    handleBlur,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addressSchema,
    onSubmit: (values) => {
      setEditOpen(false);
      setAddress(values);
    },
  });

  const fields = ["name", "address", "city", "state", "pincode", "phone"];

  const [editOpen, setEditOpen] = useState(false);

  return (
    <div>
      <h1 className="text-xl text-center text-orange-900">Address</h1>
      <div className="m-auto max-w-3xl p-2">
        <form className="flex flex-col gap-2">
          {fields.map((field) => (
            <div key={field}>
              {editOpen && <label htmlFor={field}>{field.toUpperCase()}</label>}
              <input
                disabled={!editOpen}
                className={`w-full p-2 border rounded-sm ${
                  errors[field] &&
                  touched[field] &&
                  editOpen &&
                  " border border-red-500"
                }`}
                id={field}
                type="text"
                placeholder={field}
                name={field}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values[field]}
              />
              {errors[field] && touched[field] && editOpen && (
                <p className="text-red-500">{errors[field]}</p>
              )}
            </div>
          ))}
        </form>
        <div className="flex gap-2">
          <button
            disabled={!editOpen}
            type="submit"
            onClick={handleSubmit}
            className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit disabled:bg-opacity-70 "
          >
            Update
          </button>
          <button
            onClick={() => {
              if (editOpen) {
                resetForm();
              }
              setEditOpen(!editOpen);
            }}
            className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit"
          >
            {editOpen ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}

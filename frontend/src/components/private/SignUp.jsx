import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/validationSchemas";

export default function SignUp({ setAlert, setNewUser }) {
  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values, actions) => {
      const localData = JSON.parse(localStorage.getItem("users")) || {};
      const userExists = localData[values.email];
      if (userExists) {
        actions.setFieldError("email", "Email already exists");
        actions.setSubmitting(false);
        return;
      }
      const newUser = {
        [values.email]: {
          name: values.name,
          password: values.password,
          address: {
            name: values.name,
            address: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
          },
          cart: {},
        },
      };
      localStorage.setItem(
        "users",
        JSON.stringify({ ...localData, ...newUser })
      );
      actions.resetForm();
      setNewUser(false);
      setAlert({
        flag: true,
        message: "User created successfully",
        type: "success",
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    },
  });
  const fields = ["name", "email", "password", "confirm"];
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg border p-5 sm:w-[500px] w-5/6 flex flex-col items-center justify-center rounded-lg mb-20"
    >
      <h1 className="text-orange-900 text-3xl">Sign Up</h1>
      {fields.map((field) => (
        <div key={field} className="w-full my-2">
          <label className="text-orange-800" htmlFor={field}>
            {field.toUpperCase()}
          </label>
          <input
            id={field}
            className={`w-full p-2 my-2 border rounded-md border-orange-900 ${
              errors[field] && touched[field] && "border border-red-500 "
            }`}
            type={
              field === "email"
                ? "email"
                : field === "name"
                ? "text"
                : "password"
            }
            placeholder={field === "confirm" ? "Confirm Password" : field}
            name={field}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[field]}
          />
          {errors[field] && touched[field] && (
            <p className="text-red-500">{errors[field]}</p>
          )}
        </div>
      ))}

      <button
        disabled={isSubmitting}
        className={`${
          isSubmitting ? "bg-opacity-50" : ""
        }bg-orange-700 text-white p-2 rounded-md
           hover:bg-orange-600 transition duration-300 w-full my-4`}
        type="submit"
      >
        {isSubmitting ? "Loading..." : "Sign Up"}
      </button>
      <p className="text-orange-900">
        Already have an account?{" "}
        <span
          onClick={() => {
            setNewUser(false);
          }}
          className="text-orange-700 underline cursor-pointer hover:text-orange-500"
        >
          Login
        </span>
      </p>
    </form>
  );
}
import { act, useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/userScheme";
export default function LoginSignup() {
  const [newUser, setNewUser] = useState(true);
  return (
    <div className="flex justify-center">
      {newUser ? (
        <SignUp setNewUser={setNewUser} />
      ) : (
        <Login setNewUser={setNewUser} />
      )}
      <div></div>
    </div>
  );
}

function Login({ setNewUser }) {
  return (
    <form className="bg-orange-200 p-5 w-96 flex flex-col items-center justify-center rounded-lg mb-20">
      <h1 className="text-2xl text-orange-900">Login</h1>
      <input
        className="w-full p-2 my-2"
        type="email"
        placeholder="Email"
        name="email"
        required
      />
      <input
        className="w-full p-2 my-2"
        type="password"
        placeholder="Password"
        name="password"
        required
      />
      <button className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300">
        Login
      </button>
      <p className="text-orange-900">
        Do not have an account?{" "}
        <span
          onClick={() => {
            setNewUser(true);
          }}
          className="text-orange-700 underline cursor-pointer hover:text-orange-500"
        >
          Sign up now
        </span>{" "}
      </p>
    </form>
  );
}

function SignUp({ setNewUser }) {
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
      const localData = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = localData.find((user) => user.email === values.email);
      if (userExists) {
        actions.setFieldError("email", "Email already exists");
        actions.setSubmitting(false);
        return;
      }
      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      localStorage.setItem("users", JSON.stringify([...localData, newUser]));
      actions.resetForm();
    },
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-orange-200 p-5 w-96 flex flex-col items-center justify-center rounded-lg mb-20"
    >
      <h1 className="text-orange-900 text-3xl">Sign Up</h1>
      <div className="w-full my-2">
        <input
          className={`w-full p-2 my-2 ${
            errors.name && touched.name && " border border-red-500"
          }`}
          type="text"
          placeholder="Name"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
        />
        {errors.name && touched.name && (
          <p className="text-red-500">{errors.name}</p>
        )}
      </div>

      <div className="w-full my-2">
        <input
          className={`w-full p-2 my-2 ${
            errors.email && touched.email && "border border-red-500"
          }`}
          type="email"
          placeholder="Email"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && touched.email && (
          <p className="text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="w-full my-2">
        <input
          className={`w-full p-2 my-2 ${
            errors.password && touched.password && "border border-red-500 "
          }`}
          type="password"
          placeholder="Password"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        {errors.password && touched.password && (
          <p className="text-red-500">{errors.password}</p>
        )}
      </div>

      <div className="w-full my-2">
        <input
          className={`w-full p-2 my-2 ${
            errors.confirm && touched.confirm && "border-red-500 border"
          }`}
          type="password"
          placeholder="Confirm password"
          name="confirm"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.confirm}
        />
        {errors.confirm && touched.confirm && (
          <p className="text-red-500">{errors.confirm}</p>
        )}
      </div>
      <button
        disabled={isSubmitting}
        className={`${
          isSubmitting ? "bg-opacity-50" : ""
        }bg-orange-700 text-white px-2 py-1 rounded-md
         hover:bg-orange-600 transition duration-300`}
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

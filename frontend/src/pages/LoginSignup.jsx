import { useContext, useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/userScheme";
import Alerts from "../components/Alerts";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function LoginSignup() {
  const [newUser, setNewUser] = useState(false);
  const [alert, setAlert] = useState(null);
  return (
    <div className="flex justify-center flex-col items-center gap-2 my-5">
      {alert && <Alerts type={alert.type} message={alert.message} />}
      {newUser ? (
        <SignUp setAlert={setAlert} setNewUser={setNewUser} />
      ) : (
        <Login setAlert={setAlert} setNewUser={setNewUser} />
      )}
    </div>
  );
}

function Login({ setAlert, setNewUser }) {
  const { login, currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const localData = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = localData.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      console.log(userExists);
      if (userExists) {
        login(userExists);
        setAlert({ message: "Login successful", type: "success" });
        setTimeout(() => {
          setAlert(null);
          navigate(-1);
        }, 1000);
      } else {
        setAlert({ message: "Invalid credentials", type: "warning" });
      }
    },
  });
  if (currentUser) {
    navigate("/profile");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg border p-5 sm:w-[500px] w-5/6 flex flex-col items-center justify-center rounded-lg mb-20"
    >
      <h1 className="text-2xl text-orange-900">Login</h1>
      <div className="w-full my-2">
        <label className="text-orange-900" htmlFor="email">
          EMAIL
        </label>
        <input
          id="email"
          className="w-full p-2 my-2 border rounded-md border-orange-900"
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="w-full my-2">
        <label className="text-orange-900" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          className="w-full p-2 my-2 border rounded-md border-orange-900"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={values.password}
        />
      </div>
      <button
        type="submit"
        className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300"
      >
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
          Sign up
        </span>{" "}
      </p>
    </form>
  );
}

function SignUp({ setAlert, setNewUser }) {
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

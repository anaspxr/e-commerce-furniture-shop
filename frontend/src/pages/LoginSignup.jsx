import { useState } from "react";
import Button from "../components/Button";
export default function LoginSignup() {
  const [newUser, setNewUser] = useState(true);

  return (
    <div className="flex justify-center">
      {newUser ? (
        <SignUp setNewUser={setNewUser} />
      ) : (
        <Login setNewUser={setNewUser} />
      )}
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
      <Button>Login</Button>
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
  return (
    <form className="bg-orange-200 p-5 w-96 flex flex-col items-center justify-center rounded-lg mb-20">
      <h1 className="text-orange-900 text-3xl">Sign Up</h1>
      <div className="w-full my-2">
        <input
          className="w-full p-2"
          type="text"
          placeholder="Name"
          name="name"
        />
      </div>

      <div className="w-full my-2">
        <input
          className="w-full p-2 my-2"
          type="email"
          placeholder="Email"
          name="email"
        />
      </div>

      <div className="w-full my-2">
        <input
          className="w-full p-2 my-2"
          type="password"
          placeholder="Password"
          name="password"
        />
      </div>

      <div className="w-full my-2">
        <input
          className="w-full p-2 my-2"
          type="password"
          placeholder="Confirm password"
          name="confirm"
        />
      </div>
      <Button>Sign Up</Button>
      <p className="text-orange-900">
        Already have an account?{" "}
        <span
          onClick={() => {
            setNewUser(false);
          }}
          className="text-orange-700 underline cursor-pointer hover:text-orange-500"
        >
          Login
        </span>{" "}
      </p>
    </form>
  );
}

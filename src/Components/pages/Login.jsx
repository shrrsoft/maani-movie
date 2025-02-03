import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const { login, session } = useContext(UserContext);
  function handleLogin(e) {
    e.preventDefault();

    const { username, password } = e.target.elements;
    login(username.value, password.value);
  }

  return (
    <div className="container">
      <p>{session}</p>
      <form
        className="mx-auto mt-3 flex flex-col gap-4 w-[15rem]"
        action=""
        onSubmit={handleLogin}>
        <input
          className="text-black p-1 outline-none rounded-md"
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          className="text-black p-1 outline-none rounded-md"
          type="password"
          name="password"
          placeholder="password"
        />
        <input
          className="bg-rose-500 rounded-md mt-3 p-1 mx-auto w-[5rem] hover:bg-rose-700 hover:text-white"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
}

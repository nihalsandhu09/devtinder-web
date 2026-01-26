import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../utils/constant";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BaseUrl + "/login",
        {
          email: emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error.response.data || "something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <fieldset
        className="
      fieldset
      bg-base-200
      border-base-300
      rounded-box
      border
      p-10
      w-full
      max-w-md
    "
      >
        <legend className="fieldset-legend text-lg font-bold">Login</legend>

        <label className="label">
          <span className="label-text text-lg">Email </span>
        </label>

        <input
          type="email"
          className="input input-bordered w-full text-lg"
          value={emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
          }}
        />

        <label className="label mt-4 text-lg">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          className="input input-bordered w-full text-lg"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="text-red 500">{error} </p>
        <button
          className="btn btn-neutral w-full mt-6 text-lg font-bold"
          onClick={handleLogin}
        >
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;

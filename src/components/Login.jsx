import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="flex items-center justify-center py-12 px-4 mt-5">
      <div className="w-full max-w-md bg-base-200 border border-base-300 rounded-2xl p-6 sm:p-10 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>

          <input
            type="email"
            className="input input-bordered w-full"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Password</label>

          <input
            type="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Button */}
        <button className="btn btn-neutral w-full mt-2" onClick={handleLogin}>
          Login
        </button>

        {/* Signup */}
        <p className="text-sm mt-6 text-center">
          New User?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

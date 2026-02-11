import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../utils/constant";
import { removeUser } from "../store/userSlice";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        BaseUrl + "/logout",
        {}, // no body needed
        { withCredentials: true }, // ✅ correct place
      );
      console.log(res.data);
      dispatch(removeUser());
      navigate("/login");
      alert(res.data, "Logged out successfully");
    } catch (error) {
      console.log("LOGOUT ERROR 👉", error.response?.data);
    }
  };
  return (
    <div className="navbar bg-base-200 shadow-sm flex ">
      <div className="flex-1 text-lg sm:text-xl font-bold">
        <Link to="/" className="text-lg sm:text-xl font-bold">
          DEVTINDER🧑‍💻
        </Link>
      </div>
      <div className="flex-1 hidden md:flex gap-6 items-center">
        <ul className="flex item-center gap-5">
          <Link to="/login">
            {" "}
            <li>Login</li>
          </Link>

          <Link to="/signup">
            {" "}
            <li>SignUp</li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered hidden sm:block w-32 md:w-48"
        />
        {user && (
          <div className="dropdown dropdown-end mx-5 flex items-center gap-5">
            <p>Welcome {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  alt="Profile"
                  src={
                    user.photoUrl ||
                    "https://randomuser.me/api/portraits/lego/1.jpg"
                  }
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-10 w-52 p-2 shadow"
            >
              <Link to="/profile/view">
                {" "}
                <li>
                  <p className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </p>
                </li>
              </Link>

              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">All Requests</Link>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <div className="navbar bg-base-300 shadow-sm flex ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DEVTINDER🧑‍💻</a>
      </div>
      <div className="flex-1">
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
      <div className="flex gap-2 item-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto p-2"
        />
        {user && (
          <div className="dropdown dropdown-end mx-5 flex items-center gap-5">
            <p>Welcome {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.photoUrl ||
                    "https://randomuser.me/api/portraits/lego/1.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <Link to="/profile/view">
                {" "}
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
              </Link>

              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

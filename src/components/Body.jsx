import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BaseUrl + "/profile/view", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }

      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

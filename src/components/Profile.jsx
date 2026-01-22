import React, { useEffect, useState } from "react";
import axios from "axios";
const Profile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/profile/view", {
          withCredentials: true,
        });
        console.log(res);
        const data = await res.data;
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  return <h1>{user.firstName}</h1>;
};

export default Profile;

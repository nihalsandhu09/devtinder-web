import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/constant";
const Profile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(BaseUrl + "/profile/view", {
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

  return (
    <div className="min-h-screen flex justify-center items-start p-6 mt-8">
      <div className="card w-full max-w-2xl bg-base-400 shadow-xl">
        {/* Avatar */}
        <div className="flex justify-center mt-6">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user.photoUrl ||
                  "https://randomuser.me/api/portraits/lego/1.jpg"
                }
                alt="profile"
              />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body">
          {/* Name */}
          <h2 className="text-center text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>

          {/* Email */}
          <p className="text-center text-sm opacity-70">{user.email}</p>

          {/* About */}
          {user.about && (
            <div className="mt-4">
              <h3 className="font-semibold">About</h3>
              <p className="opacity-80">{user.about}</p>
            </div>
          )}

          {/* Skills */}
          {user.skills?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span key={index} className="badge badge-outline">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="card-actions justify-end mt-6">
            <button className="btn btn-outline btn-sm">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

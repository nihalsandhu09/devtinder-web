import axios from "axios";
import React from "react";
import { BaseUrl } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../store/feedSlice";
const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();
  const sendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BaseUrl + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(_id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;
  return (
    <div className="card w-full max-w-sm mx-auto bg-base-300 shadow-xl">
      {/* Image */}
      <figure className="px-4 pt-4">
        <img
          src={
            user.photoUrl || "https://randomuser.me/api/portraits/lego/1.jpg"
          }
          alt="profile"
          className="rounded-xl h-56 sm:h-64 w-full object-cover"
        />
      </figure>

      {/* Body */}
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-lg sm:text-xl">
          {user.firstName} {user.lastName}
        </h2>
        <h2 className="text-sm sm:text-base opacity-80">
          {user.age} {user.gender}
        </h2>
        {user.about && (
          <p className="text-sm opacity-80 mt-2 line-clamp-3">{user.about}</p>
        )}

        {Array.isArray(user.skills) && user.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skills.map((skill, index) => (
              <span key={index} className=" text-xs sm:text-sm opacity-80">
                {skill}
              </span>
            ))}
          </div>
        )}

        {showActions && (
          <div className="card-actions justify-between mt-4">
            <button
              className="btn bg-red-500 p-5 font-bold"
              onClick={() => {
                sendRequest("ignored", user._id);
              }}
            >
              Ignore ❌
            </button>

            <button
              className="btn bg-red-300 p-5 font-bold "
              onClick={() => {
                sendRequest("interested", user._id);
              }}
            >
              Interested ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;

import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BaseUrl } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
const EditProfile = ({ user }) => {
  console.log(user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    // clear exisiting error
    setError("");
    try {
      const res = await axios.patch(
        BaseUrl + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills: skills.split(",").map((s) => s.trim()),
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.message);
    }
  };
  const previewUser = {
    ...user,
    firstName,
    lastName,
    age,
    gender,
    photoUrl,
    about,
    skills: skills
      ? skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
  };
  return (
    <>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          {/* FORM SECTION */}
          <div className="w-full max-w-xl bg-base-200 border border-base-300 rounded-2xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
              Edit Profile
            </h2>

            {error && (
              <div className="alert alert-error mb-4 text-sm">{error}</div>
            )}

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="About you"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <input
              type="text"
              className="input input-bordered w-full mt-4"
              placeholder="Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <input
              type="text"
              className="input input-bordered w-full mt-4"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />

            <button
              className="btn btn-primary w-full mt-6"
              onClick={saveProfile}
            >
              Save Changes
            </button>
          </div>

          {/* PREVIEW SECTION */}
          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <UserCard user={previewUser} showActions={false} />
          </div>
        </div>
      </div>

      {/* TOAST */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

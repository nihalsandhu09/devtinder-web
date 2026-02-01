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
      <div className="flex items-center justify-center">
        <UserCard user={previewUser} />
        <div className="min-h-screen flex items-center justify-center px-4">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-8 w-full max-w-lg">
            <legend className="fieldset-legend text-lg font-semibold">
              Edit Profile
            </legend>

            {error && <div className="alert alert-error mb-4">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <input
              type="text"
              className="input input-bordered w-full mt-4"
              placeholder="AGE"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <input
              type="text"
              className="input input-bordered w-full mt-4"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

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
              name="photoUrl"
              placeholder="Paste image URL here"
              className="input input-bordered w-full mt-4"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <button
              className="btn btn-primary w-full mt-6"
              onClick={saveProfile}
            >
              SAVE
            </button>
          </fieldset>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

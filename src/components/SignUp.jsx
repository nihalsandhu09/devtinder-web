import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/constant";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState(""); // comma separated
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post(
        BaseUrl + "/signup",
        {
          firstName,
          lastName,
          email,
          password, // plain password (backend hashes it)
          about,
          skills: skills ? skills.split(",").map((s) => s.trim()) : [],
          photoUrl,
          gender,
          age,
        },
        {
          withCredentials: true,
        },
      );

      alert("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-8 w-full max-w-lg">
        <legend className="fieldset-legend text-lg font-semibold">
          Sign Up
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
          type="email"
          className="input input-bordered w-full mt-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input input-bordered w-full mt-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
        <input
          type="text"
          name="photoUrl"
          placeholder="Paste image URL here"
          className="input input-bordered w-full mt-4"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
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

        <button
          className="btn btn-primary w-full mt-6"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </fieldset>
    </div>
  );
}

export default Signup;

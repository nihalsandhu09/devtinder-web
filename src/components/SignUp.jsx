import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/constant";
import { useNavigate, Link } from "react-router-dom";

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
      const res = await axios.post(
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
      console.log(res);

      alert("Signup successful ✅");

      return navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-base-200 border border-base-300 rounded-2xl p-6 sm:p-10 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {error && <div className="alert alert-error mb-4 text-sm">{error}</div>}

        {/* Name Grid */}
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

        {/* Email */}
        <input
          type="email"
          className="input input-bordered w-full mt-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="input input-bordered w-full mt-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Age & Gender */}
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

        {/* Photo URL */}
        <input
          type="text"
          placeholder="Profile Image URL"
          className="input input-bordered w-full mt-4"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        {/* About */}
        <textarea
          className="textarea textarea-bordered w-full mt-4"
          placeholder="About you"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        {/* Skills */}
        <input
          type="text"
          className="input input-bordered w-full mt-4"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        {/* Button */}
        <button
          className="btn btn-primary w-full mt-6"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Login Redirect */}
        <p className="text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

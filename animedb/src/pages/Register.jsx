import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // database has birth_date, so the format, mind the names
    const inputs = {
      email: email,
      password: password,
      username: username,
      gender: gender,
      location: location,
      birth_date: birthdate,
    };

    e.preventDefault();
    console.log(inputs);
    try {
      const res = await axios.post("/auth/register", inputs);
      console.log(res);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="auth">
      <div className="auth-box">
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="email"> Email: </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            palceholder="example@email.com"
            id="email"
            name="email"
          />

          <label htmlFor="username"> User Name: </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            palceholder="xxxxx"
            id="username"
            name="username"
          />

          <label htmlFor="password"> Password: </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            palceholder="********"
            id="password"
            name="password"
          />

          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="location"> Location: </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="location"
            palceholder="********"
            id="location"
            name="location"
          />

          <label htmlFor="birthdate"> Birthdate: </label>
          <input
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            type="date"
            palceholder="********"
            id="birthdate"
            name="birthdate"
          />
          <button className="auth-button">Register</button>
          {err && <p style={{ color: "red" }}>{err}</p>}
        </form>
        <button className="link-btn">
          <Link to="/login">Already have an account? Login.</Link>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../Login.css";

const Login = ({ login, setLogin }) => {
  const userModel = {
    email: "",
    password: "",
  };

  const history = useHistory();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loginText, setLoginText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoginDetails(userModel);
    axios
      .post("http://localhost:5000/login", loginDetails)
      .then((response) => {
        // console.log(response);
        setLogin(!login);
        history.push("/", {
          email: response.data.email,
          directorID: response.data._id,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoginText("User not Found! Please check the email or the password.");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleClick}>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={loginDetails.email}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={loginDetails.password}
          placeholder="Password"
          required
        />
        <button type="submit">{login ? "Logout" : "Login"}</button>
        <p>{loginText}</p>
      </form>
    </div>
  );
};

export default Login;

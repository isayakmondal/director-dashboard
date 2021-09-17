import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (localStorage.getItem('loginDetails')!==null) {

      // console.log(localStorage.getItem('loginDetails'));
      
      axios
      .post("http://localhost:5000/login",JSON.parse(localStorage.getItem('loginDetails')))
      .then((response) => {
        // console.log(response);
        setLogin(true);
        history.push("/", {
          email: response.data.email,
          directorID: response.data._id,
        });
      })
      .catch((error) => {
        console.log(error);
        
      })
    }
    else{
      setLogin(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginDetails(userModel);
    axios
      .post("http://localhost:5000/login", loginDetails)
      .then((response) => {
        // console.log(response);
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({ email: response.data.email, password: loginDetails.password})
        );
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
      <form onSubmit={handleSubmit}>
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

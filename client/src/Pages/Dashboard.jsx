import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Company from "../components/Company";
import Create from "../components/Create";
import "../App.css";
import { API_URL} from "../env.js";

const Dashboard = ({ login, setLogin }) => {
  const [companyData, setCompanyData] = useState([]);
  const [directorData, setDirectorData] = useState({
    email: "",
    directorID: "",
  });
  const [someState, setSomeState] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!login) {
      history.push("/login");
    } else {
      axios
        .get(`${API_URL}/getCompany` || "http://localhost:5000/getCompany", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          // console.log(response.data);
          setCompanyData(response.data);

          setDirectorData({
            email: location.state.email,
            directorID: location.state.directorID,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [login, history, someState]);

  const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("loginDetails");
    localStorage.removeItem("token");
    setLogin(!login);
  };

  return (
    <div>
      <h1>Director Dashboard</h1>
      <h4>User Logged in : {directorData.email}</h4>
      <button onClick={handleClick}>{login ? "Logout" : "Login"}</button>

      <Create
        directorID={directorData.directorID}
        setSomeState={setSomeState}
        someState={someState}
      />

      <table className="center">
      <tbody>
        <tr>
          <th>Company Name</th>
          <th>Company Logo</th>
          <th>Facebook URL</th>
          <th>Linkedin URL</th>
          <th>Options</th>
        </tr>
       

        {companyData.map((currentCompany) => {
          return (
            <Company
              name={currentCompany.companyName}
              logo={currentCompany.companyLogo}
              facebookURL={currentCompany.facebookURL}
              linkedinURL={currentCompany.linkedinURL}
              id={currentCompany._id}
              key={currentCompany._id}
              setSomeState={setSomeState}
              someState={someState}
            />
          );
        })}
         </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

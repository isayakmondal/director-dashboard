import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Company from "../components/Company";
import Create from "../components/Create";
import "../App.css";

const Dashboard = ({ login, setLogin }) => {
  const [companyData, setCompanyData] = useState([]);
  const [directorData, setDirectorData] = useState({
    email: "",
    directorID: "",
  });
  const [clickCreate, setClickCreate] = useState(false);
  // const [isUpdate, setIsUpdate] = useState(false);
  const [someState, setSomeState] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!login) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:5000/getCompany")
        .then((response) => {
          console.log(response.data);
          setCompanyData(response.data);
          console.log(location.state.email);
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

  const updateState = () => {
    axios
      .get("http://localhost:5000/getCompany")
      .then((response) => {
        console.log(response.data);
        setCompanyData(response.data);
        console.log(location.state.email);
        setDirectorData({
          email: location.state.email,
          directorID: location.state.directorID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  const onClickCreate = () => {
    setClickCreate(true);
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
        updateState={updateState}
      />
     
      <table className="center">
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
      </table>
    </div>
  );
};

export default Dashboard;

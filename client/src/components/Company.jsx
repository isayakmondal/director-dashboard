import axios from "axios";
import React from "react";
import Update from "./Update";
import "../App.css";
import { API_URL} from "./env.js";

const Company = (props) => {
  

  const handleClick = () => {
    axios
      .post(`${API_URL}/deleteCompany` || "http://localhost:5000/deleteCompany", { _id: props.id },{
        headers:{
          "x-access-token": localStorage.getItem("token")
        },
      })
      .then((response) => {
        // console.log(response);
        props.setSomeState(!props.someState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    
      <tr>
        <td>{props.name}</td>
        <td>
          <img src={props.logo} alt="company logo" />
        </td>
        <td>
          <a
            href={`https://${props.facebookURL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.facebookURL}
          </a>
        </td>
        <td>
          <a
            href={`https://${props.linkedinURL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.linkedinURL}
          </a>
        </td>
        <td>
          {" "}
          <Update
            id={props.id}
            setSomeState={props.setSomeState}
            someState={props.someState}
          />
          <button onClick={handleClick}>Delete</button>
        </td>
      </tr>
      
    </>
  );
};

export default Company;

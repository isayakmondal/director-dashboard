import axios from "axios";
import React, { useState } from "react";
import Update from "./Update";
import "../App.css";

const Company = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    // setIsClicked(true);
    axios
      .post("http://localhost:5000/deleteCompany", { _id: props.id })
      .then((response) => {
        console.log(response);
        props.setSomeState(!props.someState);
        // props.updateState();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <p>{props.name}</p>
        <p>{props.logo}</p>
        <p>{props.facebookURL}</p>
        <p>{props.linkedinURL}</p> */}
      {/* <li>
        <ul>{props.name}</ul>
      </li>
      <li>
        <ul>{props.logo}</ul>
      </li>
      <li>
        <ul>{props.facebookURL}</ul>
      </li>
      <li>
        <ul>{props.linkedinURL}</ul>
      </li> */}
      <tr>
        <td>{props.name}</td>
        <td><img src={props.logo} alt="company logo" width="50" height="30" /></td>
        <td><a href={`https://${props.facebookURL}`} target="_blank" rel="noopener noreferrer">{props.facebookURL}</a></td>
        <td><a href={`https://${props.linkedinURL}`} target="_blank" rel="noopener noreferrer">{props.linkedinURL}</a></td>
        <td> <Update
        id={props.id}
        setSomeState={props.setSomeState}
        someState={props.someState}
      />
      <button onClick={handleClick}>Delete</button></td>
      </tr>

      {/* <p>{id}</p> */}

     
    </>
  );
};

export default Company;

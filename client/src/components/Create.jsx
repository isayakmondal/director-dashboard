import axios from "axios";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FileBase64 from "react-file-base64";
import { API_URL} from "../env.js";

const Create = (props) => {
  const companyModel = {
    companyName: "",
    companyLogo: "",
    facebookURL: "",
    linkedinURL: "",
    userID: "",
  };

  const [companyDetails, setcompanyDetails] = useState(companyModel);
  const [isRequired,setIsRequired] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name!=="companyName"){
    if(value.length){setIsRequired(false)}
    else{setIsRequired(true)}
    }

    setcompanyDetails({
      ...companyDetails,
      userID: props.directorID,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(companyDetails);
    axios
      .post(`${API_URL}/createCompany`, companyDetails,{
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
    setcompanyDetails(companyModel);
    setIsRequired(true);
  };

  return (
    <Popup trigger={<button>Create</button>} position="right center">
      <div>
        <h2>Add New Company</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="companyName"
            onChange={handleChange}
            value={companyDetails.companyName}
            placeholder="Compnay Name"
            required
          />
          <input
            type="text"
            name="facebookURL"
            onChange={handleChange}
            value={companyDetails.facebookURL}
            placeholder="Facebook URL"
            required={isRequired}
          />
          <input
            type="text"
            name="linkedinURL"
            onChange={handleChange}
            value={companyDetails.linkedinURL}
            placeholder="Linkedin URL"
            required={isRequired}
          />
          <p>Upload Company Logo:</p>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setcompanyDetails({ ...companyDetails, companyLogo: base64 })
            }
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </Popup>
  );
};

export default Create;

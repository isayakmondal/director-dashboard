import axios from "axios";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FileBase64 from "react-file-base64";

const Update = (props) => {
  const [companyDetails, setCompanyDetails] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, _id: props.id, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();

    console.log(companyDetails);
    axios
      .post("http://localhost:5000/updateCompany", companyDetails)
      .then((response) => {
        console.log(response);

        props.setSomeState(!props.someState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Popup trigger={<button>Update</button>} position="left center">
      <div>
        <h2>Update Company</h2>
        <form action="">
          <input
            type="text"
            name="companyName"
            onChange={handleChange}
            placeholder="Compnay Name"
          />
          <input
            type="text"
            name="facebookURL"
            onChange={handleChange}
            placeholder="Facebook URL"
          />
          <input
            type="text"
            name="linkedinURL"
            onChange={handleChange}
            placeholder="Linkedin URL"
          />
          <p>Upload Company Logo:</p>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setCompanyDetails({ ...companyDetails, companyLogo: base64 })
            }
            required
          />
          <button onClick={handleClick}>Update</button>
        </form>
      </div>
    </Popup>
  );
};

export default Update;

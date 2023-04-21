import axios from "axios";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FileBase64 from "react-file-base64";
import { API_URL} from "./env.js";

const Update = (props) => {
  const [companyDetails, setCompanyDetails] = useState({});
  const [isRequired, setIsRequired] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.length) {
      setIsRequired(false);
      setCompanyDetails({ ...companyDetails, _id: props.id, [name]: value });
    } else {
      setIsRequired(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(companyDetails);
    axios
      .post(`${API_URL}/updateCompany` || "http://localhost:5000/updateCompany", companyDetails, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
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
    <Popup trigger={<button>Update</button>} position="left center">
      <div>
        <h2>Update Company</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="companyName"
            onChange={handleChange}
            placeholder="Compnay Name"
            required={isRequired}
          />
          <input
            type="text"
            name="facebookURL"
            onChange={handleChange}
            placeholder="Facebook URL"
            required={isRequired}
          />
          <input
            type="text"
            name="linkedinURL"
            onChange={handleChange}
            placeholder="Linkedin URL"
            required={isRequired}
          />
          <p>Upload Company Logo:</p>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setCompanyDetails({ ...companyDetails, companyLogo: base64 })
            }
            required={isRequired}
          />
          <button>Update</button>
        </form>
      </div>
    </Popup>
  );
};

export default Update;

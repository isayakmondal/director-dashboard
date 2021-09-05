import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FileBase64 from 'react-file-base64';

 const Create = (props) => {

  const companyModel = {
    companyName: '',
    companyLogo: '',
    facebookURL: '',
    linkedinURL: '',
    userID: ''
   }
   
   const [companyDetails, setcompanyDetails] = useState(companyModel)
//    const [companyDetails, setcompanyDetails] = useState({})
// useEffect(()=>{
//   setcompanyDetails({ companyName: '',
//     companyLogo: '',
//     facebookURL: '',
//     linkedinURL: '',
//     userID: props.directorID
// })
// }, [])

  const handleChange = (e)=>{

    const {name,value} = e.target;
    setcompanyDetails( {...companyDetails,userID:props.directorID,[name]:value});
  } 

  const handleClick=(e)=>{
    e.preventDefault();
    // setcompanyDetails( {...companyDetails, userID:props.directorID});
    console.log(companyDetails);
    axios.post('http://localhost:5000/createCompany',companyDetails)
        .then((response)=>{
            console.log(response);
            props.setSomeState(!props.someState);
            // props.updateState();
          
        })
        .catch((error)=>{
            console.log(error);
        })
        setcompanyDetails(companyModel);
  }

  return(<Popup trigger={<button >Create</button>} position="right center">
    <div>
      <h2>Add New Company</h2>
      <form onSubmit={handleClick}>
        <input type="text" name="companyName" onChange={handleChange} value={companyDetails.companyName} placeholder="Compnay Name" required />
        {/* <input type="text" name="companyLogo" onChange={handleChange} value={companyDetails.companyLogo} placeholder="Compnay logo" required /> */}
        <input type="text" name="facebookURL" onChange={handleChange} value={companyDetails.facebookURL} placeholder="Facebook URL" required/>
        <input type="text" name="linkedinURL" onChange={handleChange} value={companyDetails.linkedinURL} placeholder="Linkedin URL" required/>
        <p>Upload Company Logo:</p>
        <FileBase64 type="file" multiple={false} onDone={({base64})=> setcompanyDetails({...companyDetails,companyLogo: base64})} required/>
       <button type='submit'>Add</button>
      </form>
    </div>
  </Popup>
  )}

export default Create;
import director from "../models/director.js";
import company from "../models/company.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
let directorID ;


export const getDirector = async (req, res) => {
  try {
     director.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          bcrypt.compare(req.body.password,foundUser.password,(error, result) => {
              if (result) {
                directorID = foundUser.id;
                console.log(directorID);

                res.status(200).json(foundUser);
              }
              else{
                console.log("User not found! Please check the email or the password");
                res.status(404).json({ message: 'Password Incorrect' });
              }
            }
          );
        }
        else{
          res.status(404).json({ message: 'User not Found!'});
        }
      }
    });
  } catch (error) {
    res.send(404).json({ message: error.message });
  }
};

export const createDirector = async (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    const newDirector = new director({
      email: email,
      password: hash,
    });

    try {
      await newDirector.save();
      res.status(201).json(newDirector);
    } catch (error) {
      res.send(201).json({ message: error.message });
    }
  });
};


export const getCompnay = async (req, res) => {
  try {
    company.find({ userID: directorID }, (err, foundCompanies) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(foundCompanies);
        res.status(200).json(foundCompanies);
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createCompany = async (req, res) => {
  // const post = req.body;
  const { companyName, companyLogo, linkedinURL, facebookURL } = req.body;

  const newCompany = new company({
    companyName: companyName,
    companyLogo: companyLogo,
    linkedinURL: linkedinURL,
    facebookURL: facebookURL,
    userID: directorID,
  });
  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const updateCompany = async (req,res)=>{

  console.log(req.body);
  if(!isEmpty(req.body)){
  company.updateOne({_id :req.body._id},req.body,(err)=>{
    if(err){
      console.log(err);
      res.status(409).json({ message: err });
    }
    else{
      console.log("Succesfully Updated.");
      res.status(201).json({message:'Company Updated!'});
    } 
  });
}
}

export const deleteCompany = async (req,res)=>{
  
  company.deleteOne(req.body,(err)=>{
    if(err){
      console.log(err);
      res.status(409).json({ message: err });
    }
    else{
      console.log("Deletion Successful!")
      res.status(200).json({message:'Deletion Successful!'});
    }
  })
}

import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
    companyName: String,
    companyLogo: String,
    linkedinURL: String,
    facebookURL : String,
    userID: String,
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const company = mongoose.model('company',companySchema);

export default company;
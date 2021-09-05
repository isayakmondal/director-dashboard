import mongoose from 'mongoose';

const directorSchema = mongoose.Schema({
    
    email: String,
    password : String,
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const director = mongoose.model('director',directorSchema);

export default director;
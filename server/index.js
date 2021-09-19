import './env.js'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/route.js';



const app = express();


app.use(express.json({limit: "30mb",extended : true}));
app.use(express.urlencoded({limit: "30mb",extended : true}));
app.use(cors());

app.use('/',router);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> app.listen(PORT,()=> console.log(`Server started on port ${PORT}`)))
.catch((error)=> console.log(error.message));

// mongoose.set('useFindAndModify', false);

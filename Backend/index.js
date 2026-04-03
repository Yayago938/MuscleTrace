const express=require('express');
const cors=require('cors');
require('dotenv').config();
const port=5000;
const app=express();
const authroutes=require('./routes/authroutes')
const authmiddleware=require('./middlewares/authmiddleware'); 

app.use('/api/auth',authroutes);
app.use(cors());
app.use(express.json());
app.use(authmiddleware);

app.get('/',(req,res)=>{
    res.send('Running');
})
app.listen(port,()=>{
    console.log("Server is running on port 5000")
})

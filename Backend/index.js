const express=require('express');
const cors=require('cors');
require('dotenv').config();
const port=5000;
const app=express();
const authroutes=require('./routes/authroutes')
const authmiddleware=require('./middlewares/authmiddleware'); 
const workoutRoutes=require('./routes/workoutroutes');
const exerciseRoutes=require('./routes/exerciseroutes');
const progressRoutes=require('./routes/progressroutes');

app.use(express.json());
app.use(cors());
app.use('/api/auth',authroutes);
app.use("/workouts", workoutRoutes)
app.use("/exercises", exerciseRoutes)
app.use("/progress", progressRoutes) 

app.get('/',(req,res)=>{
    res.send('Running');
})
app.listen(port,()=>{
    console.log("Server is running on port 5000")
})

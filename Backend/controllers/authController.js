const prisma=require("../utils/prisma");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv/config");
 const register= async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const hashedpassword= await bcrypt.hash(password, 10);
        const user= await prisma.user.create({
            data:{
                name,
                email,
                password:hashedpassword,
            }
        })
        res.json(user)
    }catch(err){
        res.status(500).json({error:err.message})
    }
    
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user= await prisma.user.findUnique({
            where:{ email}
        })
        if (!user) return res.status(404).json({ error: "User not found" })
        const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch) return res.status(401).json({error:"Invalid credentials"})
        const token=jwt.sign({userId:user.id}, process.env.JWT_SECRET)
    res.json({token})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports={register,login}
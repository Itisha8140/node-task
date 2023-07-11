require('dotenv').config();
const admin  =require('../models/register');
const authMOdels = require('../models/login');
const jwt = require('jsonwebtoken');
const secret = "8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaPdRgUk";
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const loginData = async(req,res)=>{
    try {
    const { body: { email, password } } = req;
    let isdata = await admin.findOne({ email: email });
    if (!isdata ) {
        res.status(404).json({ success: false, msg: "User not found" })
    }
    if(!bcrypt.compareSync(password, isdata.password)){
        return res.status(400).json({ success: false, msg: "password is not match" })
    }
    const payload = {
        id: isdata.id,
        email: isdata.email
    }
    const accessToken = jwt.sign(payload, secret, { expiresIn: "1d" });

    await authMOdels.create({ token: accessToken, user_id: isdata.id })

    res.status(200).json({ success: true, token: accessToken, msg: "userlogged in successfully " })
} catch (error) {
    console.error("Error creating Location:", error);
    return res.status(500).json({ error: "Internal Server Error" });
};
}
const logout = async(req,res)=>{
    try {
        const { params: { id } } = req
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID" });
          }
        await authMOdels.findByIdAndDelete(id)
        res.status(200).json({ success: true, msg: "User logout successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}
module.exports={loginData,logout}
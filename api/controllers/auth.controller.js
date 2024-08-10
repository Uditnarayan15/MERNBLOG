import User from "../Modules/user.modules.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";

export const signup = async (req, res, next) =>{
    const { username, email, password } = req.body;

    if(!username || !email || !password || username ==='' || email==='' || password ===''){
        next(errorhandler(400,'All fields are requires'));
    }

    const haspassword = bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password: haspassword,
    });

    try {
        await newUser.save();
        res.json({message: "signup scuccessful"});
        
    } catch (error) {
        next(error);
    }
};
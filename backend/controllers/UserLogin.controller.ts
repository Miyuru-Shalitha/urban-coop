import { Request, Response } from "express"; 
const { User } = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcrypt');


const UserLogin = async (req: Request, res: Response) => { 
    try {
        console.log(req.body);
       const {error} = validateUser(req.body);
         if(error) 
            return res.status(400).send({message:error.details[0].message});
        const user = await User.findOne({email:req.body.email});
        if(!user)
            return res.status(404).send({message:"Invalide Email or password"});
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword)
            return res.status(404).send({message:"Invalide Email or password"});

        const token = user.generateAuthToken();
        res.status(200).send({data:token,message:"Login successfull"});

    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});
    }
}

const validateUser = (user:any) => {   
    const schema = Joi.object({
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("password"),
    });
    return schema.validate(user);
}

export {UserLogin};

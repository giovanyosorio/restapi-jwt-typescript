import { Request, Response } from 'express';
import {pool} from "../routes/database"
import jwt from "jsonwebtoken"
import { OkPacket } from 'mysql';
import bcrypt from "bcryptjs"

export const signup =  async (req:Request,res:Response)=>{
    try {
        const {username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const [result] = await pool.query("INSERT INTO users (username,email,password) VALUES (?,?,?)", [username, email, hashPassword]);
        const insertId = (result as any).insertId; // Use this line if TypeScript complains
        console.log({ result });
        //jwt
        const token = jwt.sign({id: insertId}, process.env.TOKEN_SECRET || "tokentest");
        res.header("auth-token", token).json({message: "User created", token});
    } catch (error) {
        res.status(500).send("error");
    }

}

export const signin = (req:Request,res:Response)=>{
    res.send("signin")
}

export const profile = (req:Request,res:Response)=>{
    res.send("profile")
}
import { Request, Response } from 'express';
import {pool} from "../routes/database"
import jwt from "jsonwebtoken"
import { OkPacket } from 'mysql2';

export const signup =  async (req:Request,res:Response)=>{
    try {
        const { username, email, password } = req.body;
        const result = await pool.query("INSERT INTO users (username,email,password) VALUES (?,?,?)", [username, email, password]);
        const { insertId } = result[0]; // Extract insertId from the first element of the result array
        res.send("signup");
        console.log({ result });
        //jwt
        const token = jwt.sign({ id: insertId }, process.env.TOKEN_SECRET || "tokentest");
        res.json(token);
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
import { Request, Response } from 'express';
import {pool} from "../routes/database"
import jwt from "jsonwebtoken"
import { OkPacket } from 'mysql';
import bcrypt from "bcryptjs"
import { RowDataPacket } from 'mysql2';


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
        res.status(500).send(error);
    }

}

export const signin = async (req:Request,res:Response)=>{

    const { email, password } = req.body;
    // Perform the query and explicitly type the result
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);
    
    // Now that we've asserted rows is RowDataPacket[], accessing rows[0] is valid
    const user = rows[0];
    if (!user) return res.status(400).json({ message: "Email or password is wrong" });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid password" });
    
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || "tokentest", {
        expiresIn: 60 * 60 * 24 // 1 day
    });
    res.header("auth-token", token).json({ message: "Welcome back", token });
    

}

export const profile = async (req:Request,res:Response)=>{
    try {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [req.userId]);
        const user = rows[0];
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status
    }


}
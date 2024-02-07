import { Request, Response } from 'express';
import {pool} from "../routes/database"


export const signup = (req:Request,res:Response)=>{
    try {
        
        const {username,email,password}=req.body
        pool.query("INSERT INTO users (username,email,password) VALUES (?,?,?)",[username,email,password])
        res.send("signup")
        console.log(req.body)
    } catch (error) {
        res.status(500).send("error")
    }


}

export const signin = (req:Request,res:Response)=>{
    res.send("signin")
}

export const profile = (req:Request,res:Response)=>{
    res.send("profile")
}
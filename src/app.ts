import express from "express"
import authRouter from "./routes/auth"
import morgan from "morgan"
const app=express()
//middlewares
app.use(express.json())
app.use(morgan("dev"))
//Settings
app.set("PORT",3000)
//routes
app.use("/api",authRouter)

export default app
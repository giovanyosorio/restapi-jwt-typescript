import express from "express"

const app=express()

app.use(express.json())
app.set("PORT",3000)


export default app
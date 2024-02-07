import dotenv from "dotenv"
import app from "./app"
dotenv.config()

console.log(process.env.TOKEN_SECRET)
import "./routes/database"


function main(){
    app.listen(app.get("PORT"))
    console.log(`Server on port ${app.get("PORT")}`)
}

main()

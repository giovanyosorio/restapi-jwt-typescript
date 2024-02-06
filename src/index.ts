import app from "./app"




function main(){
    app.listen((app.get("PORT")),(_req,res)=>{
        console.log(`listenning on port ${app.get("PORT")}`)
    })
}


main()

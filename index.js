var express =require("express");
var path = require("path");
const session = require("cookie-session");
var usuarioRutas=require("./rutas/usuario");
require("dotenv").config();

var app=express();
app.set("view engine", "ejs")
app.use("/web", express.static(path.join(__dirname,"web")));
app.use(express.urlencoded({extended:true}));
app.use(session({
    name:'session',
    keys:[process.env.SECRETO_SESSION]
}));
app.use("/", usuarioRutas);


var port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port)
})
var Sequelize = require("sequelize");
var UsuarioModelo = require("./modelos/usuario");
var NegocioModelo = require("./modelos/negocio");
require("dotenv").config();

var db = process.env.DB_MYSQL_REMOTO;
var usuario = process.env.USUARIO_MYSQL_REMOTO;
var password = process.env.PASSWORD_MYSQL_REMOTO;
var host = process.env.HOST_MYSQL_REMOTO;
var port = process.env.PORT_MYSQL_REMOTO;

var conexion = new Sequelize(db,usuario,password,{
  host:host,
  port:port,
  dialect:"mysql",
  dialectOptions: {
      ssl:{
          rejectUnauthorized: true
      }
  }
});

var Usuario = UsuarioModelo(conexion);
var Negocio = NegocioModelo(conexion);

conexion.sync({ force: false })
  .then(() => {
    console.log("conectado a mysql");
  })

  .catch((err) => {
    console.log("Error al conectarse con mysql" + err);
  });

module.exports = {
  Usuario: Usuario,
  Negocio:Negocio
}

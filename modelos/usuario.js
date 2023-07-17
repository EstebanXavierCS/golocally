var Sequelize = require("sequelize");

module.exports = (conexion) => {
  var UsuarioSchema = conexion.define("usuario", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    correo: {
      type: Sequelize.STRING,
    },
    usuario: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    tipousuario: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.TINYINT,
      default: 1,
    },
  });
  return UsuarioSchema;
};

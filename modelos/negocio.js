var Sequelize = require("sequelize");

module.exports = (conexion) => {
  var NegocioSchema= conexion.define("negocio", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    ubicacion: {
      type: Sequelize.STRING,
    },
    telefono: {
      type: Sequelize.STRING,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    productos: {
      type: Sequelize.STRING,
    },
    imagen: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
    idUsuario:{
      type: Sequelize.INTEGER,
      references: {
        model: "parent_table",
        key: "id"
    },
    onDelete: "NO ACTION"
  }
  });

  return NegocioSchema;
};

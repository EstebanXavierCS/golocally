var ruta = require("express").Router();
var { Usuario } = require("../conexion");
var { Negocio } = require("../conexion");

ruta.get("/", (req, res) => {
  res.render("inicio");
});

ruta.get("/inicioRegistro", (req, res) => {
  res.render("registro");
});


ruta.get("/Explorar", (req, res) => {
  res.render("explorar");
});


ruta.post("/inicioRegistro", (req, res) => {
  const { nombre, correo,usuario, password } = req.body;

  if (!nombre || nombre.trim() === "" || !correo ||correo.trim() === "" ||!usuario ||usuario.trim() === ""||!password ||password.trim() === ""
  ) {
    console.log("Faltan campos obligatorios");
    return;
  }

  const user = Usuario.findOne({ where: { correo: correo, usuario:usuario}})
  .then((user)=>{
    if(user){
      console.log("Ya existe el usuario");
      return;
    }else{
      console.log(req.body);
      Usuario.create(req.body)
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log("error" + err);
        });
    }
  });

});

ruta.get("/inicioSesion", (req, res) => {
  res.render("login");
});


ruta.post("/inicioSesion", (req, res) => {
  const { correo, password,  } = req.body;

  if (!correo || correo.trim() === "" || !password || password.trim() === "") {
    console.log("Faltan campos obligatorios");
    return;
  }

  const user = Usuario.findOne({ where: { correo: correo,password:password}})
    .then((user) => {
      if (!user) {
        console.log("Credenciales de inicio de sesión incorrectas");
        return;
      }
      res.redirect(`/inicio/${user.id}/${user.usuario}`);
    })
    .catch((err) => {
      console.log("error" + err);
      res.redirect("/login");
    });
});

ruta.get("/inicio/:id/:usuario", (req, res) => {
  const id=req.params.id;
  const usuario=req.params.usuario;
  const user = Usuario.findOne({ where: { id:id,usuario:usuario } })
  .then((user) => {
    if (!user) {
      console.log("Usuario no encontrado");
      return;
    }
    res.render("iniciousu", { id:id,usuario:usuario }); // Pasar los datos del usuario a la vista
  })
  .catch((err) => {
    console.log("error" + err);
    res.redirect("/login");
  });
});


ruta.get("/perfil/:id/:usuario", (req, res) => {
  const id=req.params.id;
  const usuario=req.params.usuario;

Usuario.findByPk(id)
    .then((perfil) => {
      if (perfil) {
        const nom=perfil.nombre;
        const corr=perfil.correo;
        const pass=perfil.password;
        const tip=perfil.tipousuario;
        res.render("perfil", { id: id,nombre:nom,correo:corr,usuario: usuario,password:pass,tipousuario:tip});
      } else {
        res.send("El perfil no existe");
      }
    })
    .catch((error) => {
      res.send("Error al obtener el perfil");
    });
});



ruta.post("/perfil/:id/:usuario", (req, res) => {
  const id = req.params.id;
  const usuario = req.params.usuario;

  const nuevosDatos = {
    nombre: req.body.nombre,
    correo: req.body.correo,
    password: req.body.password,
    tipousuario: req.body.tipousuario,
  };

  Usuario.update(nuevosDatos, {
    where: {
      id: id
    }
  })
    .then((result) => {
      res.redirect(`/perfil/${id}/${usuario}`);
    })
    .catch((error) => {
      res.send("Error al actualizar el perfil");
    });
});

ruta.get("/perfil/:id/:usuario/Eliminar", (req, res) => {
  const id = req.params.id;
  const usuario = req.params.usuario;

  Usuario.destroy({
    where: {
      id: id
    }
  })
    .then((result) => {
      res.redirect("/"); // Redirige a la página principal u otra página adecuada después de eliminar el usuario
    })
    .catch((error) => {
      res.send("Error al eliminar el usuario");
    });
});

ruta.get("/explorar/:id/:usuario", (req, res) => {
  const id = req.params.id;
  const usuario = req.params.usuario;
  res.render("explorarusu",{ id:id,usuario:usuario });
});

ruta.get("/nuevo/:id/:usuario", (req, res) => {
  const id = req.params.id;
  const usuario = req.params.usuario;
  res.render("nuevonegocio",{ id:id,usuario:usuario });
});



ruta.post("/nuevonegocio/:id/:usuario", (req, res) => {
  const id = req.params.id;
  const usuario = req.params.usuario;
  const idUsuario = req.body.usuarioId;
  req.body.usuarioId = idUsuario;
    console.log(req.body);
    Negocio.create(req.body)
    .then(() => {
      res.redirect(`/explorar/${id}/${usuario}`);
    })
    .catch(error => {
      console.log("error"+error);
    });
});


module.exports = ruta;

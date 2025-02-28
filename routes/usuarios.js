const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios");

router
  .route("/")
  .post(usuariosController.createUsuario)
  .get(usuariosController.getUsuarios);

router
  .route("/:idUsuario")
  .put(usuariosController.updateUsuario)
  .delete(usuariosController.deleteUsuario);

module.exports = router;

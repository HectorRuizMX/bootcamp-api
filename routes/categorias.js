const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categorias");

router
  .route("/")
  .post(categoriasController.createCategoria)
  .get(categoriasController.getCategorias);

router
  .route("/:idCategoria")
  .put(categoriasController.updateCategoria)
  .delete(categoriasController.deleteCategoria);

module.exports = router;

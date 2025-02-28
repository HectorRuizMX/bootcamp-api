const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientes");

router
  .route("/")
  .post(clientesController.createCliente)
  .get(clientesController.getClientes);

router
  .route("/:idCliente")
  .put(clientesController.updateCliente)
  .delete(clientesController.deleteCliente);

module.exports = router;

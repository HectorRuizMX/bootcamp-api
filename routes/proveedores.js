const express = require("express");
const router = express.Router();
const proveedoresController = require("../controllers/proveedores");

router
  .route("/")
  .post(proveedoresController.createProveedor)
  .get(proveedoresController.getProveedors);

router
  .route("/:idProveedor")
  .put(proveedoresController.updateProveedor)
  .delete(proveedoresController.deleteProveedor);

module.exports = router;

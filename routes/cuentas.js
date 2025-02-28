const express = require("express");
const router = express.Router();
const cuentasController = require("../controllers/cuentas");

router
  .route("/")
  .post(cuentasController.createCuenta)
  .get(cuentasController.getCuentas);

router
  .route("/:idCuenta")
  .put(cuentasController.updateCuenta)
  .delete(cuentasController.deleteCuenta);

router.route("/:idCuenta/movimientos").get(cuentasController.getMovimientos);

module.exports = router;

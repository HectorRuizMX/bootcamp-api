const express = require('express');
const router = express.Router();
const usuariosRouter = require('./usuarios');
const clientesRouter = require("./clientes");
const categoriasRouter = require('./categorias');
const proveedoresRouter = require('./proveedores');
const cuentasRouter = require('./cuentas');
const { login, createUsuario } = require('../controllers/usuarios');

router.post("/login", login);
router.post("/register", createUsuario);
router.use('/usuarios', usuariosRouter);
router.use('/clientes', clientesRouter);
router.use('/proveedores', proveedoresRouter);
router.use('/categorias', categoriasRouter);
router.use('/cuentas', cuentasRouter);

module.exports = router;

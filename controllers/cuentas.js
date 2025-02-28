const { Cuenta, CuentaDetalle } = require('../models')();

const createCuenta = async (req, res) => {
  const requiredParams = ['cuenta'];

  const lostParams = requiredParams
    .filter((param) => {
      return !req.body[param];
    })
    .map((param) => {
      return `El campo ${param} es requerido.`
  });

  if (lostParams.length > 0) {
    return res.status(400).send(lostParams);
  }

  const cuenta = await Cuenta.create(req.body);
  return res.send(cuenta);
};

const getCuentas = async (req, res) => {
  const cuentas = await Cuenta.findAll();

  return res.send(cuentas);
};

const getCuentaById = async (idCuenta) => {
  const cuenta = await Cuenta.findOne({
    where: {
      idCuenta,
    },
  });

  return cuenta;
};

const updateCuenta = async (req, res) => {
  const { idCuenta } = req.params;

  const cuenta = await getCuentaById(idCuenta);

  if(!cuenta) {
    return res.status(404).send({ msg: 'La cuenta no existe' });
  }

  await cuenta.update(req.body);

  return res.send(cuenta);
};

const deleteCuenta = async (req, res) => {
  const { idCuenta } = req.params;

  const cuenta = await getCuentaById(idCuenta);

  if (!cuenta) {
    return res.status(404).send({ msg: "La cuenta no existe" });
  }

  await cuenta.destroy();
  return res.send({
    msg: 'Cuenta eliminada.'
  });
};

const getMovimientos = async (req, res) => {
  const { idCuenta } = req.params;

  const movimientos = await CuentaDetalle.findAll({
    include: ['cliente', 'proveedor'],
    where: {
      idCuenta,
    }
  });

  return res.status(200).send(movimientos);
};

module.exports = {
  createCuenta,
  getCuentas,
  updateCuenta,
  deleteCuenta,
  getMovimientos,
};

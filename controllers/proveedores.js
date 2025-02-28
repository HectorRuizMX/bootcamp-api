const { Proveedor } = require('../models')();

const createProveedor = async (req, res) => {
  const requiredParams = ["nombre"];

  const lostParams = requiredParams
    .filter((param) => {
      return !req.body[param];
    })
    .map((param) => {
      return `El campo ${param} es requerido.`;
  });

  if (lostParams.length > 0) {
    return res.status(400).send(lostParams);
  }

  const proveedor = await Proveedor.create(req.body);
  return res.send(proveedor);
};

const getProveedors = async (req, res) => {
  const proveedores = await Proveedor.findAll();

  return res.send(proveedores);
};

const getProveedorById = async (idProveedor) => {
  const proveedor = await Proveedor.findOne({
    where: {
      idProveedor,
    },
  });

  return proveedor;
};

const updateProveedor = async (req, res) => {
  const { idProveedor } = req.params;

  const proveedor = await getProveedorById(idProveedor);

  if(!proveedor) {
    return res.status(404).send({ msg: 'El proveedor no existe' });
  }

  await proveedor.update(req.body);

  return res.send(proveedor);
};

const deleteProveedor = async (req, res) => {
  const { idProveedor } = req.params;

  const proveedor = await getProveedorById(idProveedor);

  if (!proveedor) {
    return res.status(404).send({ msg: "El proveedor no existe" });
  }

  await proveedor.destroy();
  return res.send({
    msg: 'Proveedor eliminado.'
  });
};

module.exports = {
  createProveedor,
  getProveedors,
  updateProveedor,
  deleteProveedor,
};

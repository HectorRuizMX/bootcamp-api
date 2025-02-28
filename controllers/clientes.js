const jwt = require('jsonwebtoken');
const { Cliente } = require('../models')();

const createCliente = async (req, res) => {
  const requiredParams = ["nombre", "apellidos"];

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

  const cliente = await Cliente.create(req.body);
  return res.send(cliente);
};

const getClientes = async (req, res) => {
  const clientes = await Cliente.findAll();

  return res.send(clientes);
};

const getClienteById = async (idCliente) => {
  const cliente = await Cliente.findOne({
    where: {
      idCliente,
    },
  });

  return cliente;
};

const updateCliente = async (req, res) => {
  const { idCliente } = req.params;

  const cliente = await getClienteById(idCliente);

  if(!cliente) {
    return res.status(404).send({ msg: 'El cliente no existe' });
  }

  await cliente.update(req.body);

  return res.send(cliente);
};

const deleteCliente = async (req, res) => {
  const { idCliente } = req.params;

  const cliente = await getClienteById(idCliente);

  if (!cliente) {
    return res.status(404).send({ msg: "El cliente no existe" });
  }

  await cliente.destroy();
  return res.send({
    msg: 'Cliente eliminado.'
  });
};

module.exports = {
  createCliente,
  getClientes,
  updateCliente,
  deleteCliente,
};

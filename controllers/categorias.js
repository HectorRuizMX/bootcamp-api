const jwt = require('jsonwebtoken');
const { Categoria } = require('../models')();

const createCategoria = async (req, res) => {
  const requiredParams = ['categoria'];

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

  const categoria = await Categoria.create(req.body);
  return res.send(categoria);
};

const getCategorias = async (req, res) => {
  const categorias = await Categoria.findAll();

  return res.send(categorias);
};

const getCategoriaById = async (idCategoria) => {
  const categoria = await Categoria.findOne({
    where: {
      idCategoria,
    },
  });

  return categoria;
};

const updateCategoria = async (req, res) => {
  const { idCategoria } = req.params;

  const categoria = await getCategoriaById(idCategoria);

  if(!categoria) {
    return res.status(404).send({ msg: 'La categoria no existe' });
  }

  await categoria.update(req.body);

  return res.send(categoria);
};

const deleteCategoria = async (req, res) => {
  const { idCategoria } = req.params;

  const categoria = await getCategoriaById(idCategoria);

  if (!categoria) {
    return res.status(404).send({ msg: "La categoria no existe" });
  }

  await categoria.destroy();
  return res.send({
    msg: 'Categoria eliminada.'
  });
};

module.exports = {
  createCategoria,
  getCategorias,
  updateCategoria,
  deleteCategoria,
};

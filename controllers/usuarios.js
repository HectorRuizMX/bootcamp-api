const jwt = require('jsonwebtoken');
const { Usuario } = require('../models')();

const login = async (req, res) => {
  const { correo = '', contrasenia = '' } = req.body;

  const usuario = await Usuario.findOne({
    where: {
      correo,
      contrasenia,
    }
  });

  if (!usuario) {
    return res.status(401).send({ msg: 'Correo y/o contraseña incorrecta.'});
  }

  const token = jwt.sign(usuario.dataValues, "SECRET", {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
  });

  const { contrasenia: _, ...usuarioData } = usuario.dataValues;

  return res.send({
    ...usuarioData,
    token,
  });
};

const createUsuario = async (req, res) => {
  const requiredParams = ['nombre', 'apellidos', 'correo', 'contrasenia'];

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

  const { idUsuario, ...usuarioData } = req.body;

  const usuario = await Usuario.create(usuarioData);
  return res.send(usuario);
};

const getUsuarios = async (_req, res) => {
  const usuarios = await Usuario.findAll();

  return res.send(usuarios);
};

const getUsuarioById = async (idUsuario) => {
  const usuario = await Usuario.findOne({
    where: {
      idUsuario,
    },
  });

  return usuario;
};

const updateUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  const usuario = await getUsuarioById(idUsuario);

  if(!usuario) {
    return res.status(404).send({ msg: 'El usuario no existe' });
  }

  const { idUsuario: _, ...usuarioData } = req.body;

  await usuario.update(usuarioData);

  return res.send(usuario);
};

const deleteUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  const usuario = await getUsuarioById(idUsuario);

  if (!usuario) {
    return res.status(404).send({ msg: "El usuario no existe" });
  }

  await usuario.destroy();
  return res.send({
    msg: 'Usuario eliminado.'
  });
};

module.exports = {
  login,
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
};

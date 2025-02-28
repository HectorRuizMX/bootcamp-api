const UsuarioDef = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID',
    },
    nombre: {
      type: DataTypes.STRING,
      field: 'NOMBRE',
    },
    apellidos: {
      type: DataTypes.STRING,
      field: 'APELLIDOS',
    },
    correo: {
      type: DataTypes.STRING,
      field: 'CORREO',
    },
    contrasenia: {
      type: DataTypes.STRING,
      field: 'CONTRASENIA',
    },
  },
  {
    tableName: 'USUARIOS',
    timestamps: false,
  });

  return Usuario;
};

module.exports = UsuarioDef;

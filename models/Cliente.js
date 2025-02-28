const ClienteDef = (sequelize, DataTypes) => {
  const Cliente = sequelize.define(
    "Cliente",
    {
      idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "IDCLIENTE",
      },
      nombre: {
        type: DataTypes.STRING,
        field: "NOMBRE",
      },
      apellidos: {
        type: DataTypes.STRING,
        field: "APELLIDOS",
      }
    },
    {
      tableName: "CLIENTES",
      timestamps: false,
    }
  );

  Cliente.associate = (models) => {
    Cliente.hasMany(models.CuentaDetalle, {
      foreignKey: 'idCliente',
      as: 'detalles'
    });
  };

  return Cliente;
};

module.exports = ClienteDef;

const CuentaDetalleDef = (sequelize, DataTypes) => {
  const CuentaDetalle = sequelize.define(
    "CuentaDetalle",
    {
      idCuentaDetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID",
      },
      idCategoria: {
        type: DataTypes.INTEGER,
        field: "IDCATEGORIA",
      },
      idProveedor: {
        type: DataTypes.INTEGER,
        field: "IDPROVEEDOR",
      },
      idCuenta: {
        type: DataTypes.INTEGER,
        field: "IDCUENTA",
      },
      idCliente: {
        type: DataTypes.INTEGER,
        field: "IDCLIENTE",
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        field: "IDUSUARIO",
      },
      descripcion: {
        type: DataTypes.STRING,
        field: "DESCRIPCION",
      },
      cargo: {
        type: DataTypes.FLOAT,
        field: 'CARGO'
      },
      abono: {
        type: DataTypes.FLOAT,
        field: 'ABONO'
      },
      fechaHora: {
        type: DataTypes.DATE,
        field: "FECHAHORA",
      },
      saldo: {
        type: DataTypes.FLOAT,
        field: 'SALDO'
      }
    },
    {
      tableName: "CUENTAS_DETALLE",
      timestamps: false,
    }
  );

  CuentaDetalle.associate = (models) => {
    CuentaDetalle.belongsTo(models.Cliente, {
      foreignKey: 'idCliente',
      as: 'cliente'
    });

    CuentaDetalle.belongsTo(models.Cuenta, {
      foreignKey: 'idCuenta',
      as: 'cuenta'
    });

    CuentaDetalle.belongsTo(models.Proveedor, {
      foreignKey: 'idProveedor',
      as: 'proveedor'
    });
  };

  return CuentaDetalle;
};

module.exports = CuentaDetalleDef;

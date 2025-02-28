const CategoriaDef = (sequelize, DataTypes) => {
  const Categoria = sequelize.define(
    "Categoria",
    {
      idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "IDCATEGORIA",
      },
      categoria: {
        type: DataTypes.STRING,
        field: "CATEGORIA",
      }
    },
    {
      tableName: "CATEGORIAS",
      timestamps: false,
    }
  );

  return Categoria;
};

module.exports = CategoriaDef;

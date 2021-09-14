'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dietcard extends Model {
    static associate(models) {
      dietcard.belongsTo(models.dietcolumn, {
        foreignKey: 'column_id',
        targetKey: 'id',
      });
      dietcard.hasMany(models.dietitem, {
        foreignKey: 'card_id',
        sourceKey: 'id',
      });
    }
  }
  dietcard.init(
    {
      title: DataTypes.STRING,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'dietcard',
      freezeTableName: true,
      timestamps: false,
    },
  );
  return dietcard;
};

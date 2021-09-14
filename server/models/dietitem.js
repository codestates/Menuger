'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dietitem extends Model {
    static associate(models) {
      dietitem.belongsTo(models.dietcard, {
        foreignKey: 'card_id',
        targetKey: 'id',
      });
    }
  }
  dietitem.init(
    {
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'dietitem',
      freezeTableName: true,
      timestamps: false,
    },
  );
  return dietitem;
};

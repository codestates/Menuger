'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class calendar_column extends Model {
    static associate(models) {
      calendar_column.belongsTo(models.calendar, {
        foreignKey: 'calendar_id',
      });
      calendar_column.belongsTo(models.dietcolumn, {
        foreignKey: 'dietcolumn_id',
      });
    }
  }
  calendar_column.init(
    {
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'calendar_column',
      freezeTableName: true,
      timestamps: false,
    },
  );
  return calendar_column;
};

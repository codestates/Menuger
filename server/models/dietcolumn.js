'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dietcolumn extends Model {
    static associate(models) {
      dietcolumn.hasOne(models.calendar_column, {
        foreignKey: 'column_id',
        sourceKey: 'id',
      });
      dietcolumn.belongsTo(models.post, {
        foreignKey: 'post_id',
        targetKey: 'id',
      });
      dietcolumn.hasMany(models.dietcard, {
        foreignKey: 'column_id',
        sourceKey: 'id',
      });
    }
  }
  dietcolumn.init(
    {
      title: DataTypes.STRING,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'dietcolumn',
      freezeTableName: true,
      timestamps: false,
    },
  );
  return dietcolumn;
};

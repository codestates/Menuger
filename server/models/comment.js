'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      comment.belongsTo(models.post, {
        foreignKey: 'post_id',
      });
      comment.belongsTo(models.user, {
        foreignKey: 'user_id',
      });
    }
  }
  comment.init(
    {
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'comment',
      freezeTableName: true,
      timestamps: true,
    },
  );
  return comment;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.comment, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      user.hasMany(models.post, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      user.hasMany(models.subscription, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      user.belongsToMany(models.post, {
        through: 'love',
        foreignKey: 'user_id',
      });
      user.belongsToMany(models.post, {
        through: 'bookmark',
        foreignKey: 'user_id',
      });
      user.hasOne(models.calendar, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
    }
  }
  user.init(
    {
      type: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
      freezeTableName: true,
      timestamps: true,
    },
  );
  return user;
};

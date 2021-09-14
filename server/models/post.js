'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      post.hasMany(models.comment, {
        foreignKey: 'post_id',
        sourceKey: 'id',
      });
      post.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      post.belongsToMany(models.user, {
        through: 'love',
        foreignKey: 'post_id',
      });
      post.belongsToMany(models.user, {
        through: 'bookmark',
        foreignKey: 'post_id',
      });
      post.belongsToMany(models.hashtag, {
        through: 'hashtag_post',
        foreignKey: 'post_id',
      });
      post.hasMany(models.dietcolumn, {
        foreignKey: 'post_id',
        sourceKey: 'id',
      });
    }
  }
  post.init(
    {
      type: DataTypes.STRING,
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'post',
      freezeTableName: true,
      timestamps: true,
    },
  );
  return post;
};

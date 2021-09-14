'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hashtag extends Model {
    static associate(models) {
      hashtag.belongsToMany(models.post, {
        through: 'hashtag_post',
        foreignKey: 'hashtag_id',
      });
    }
  }
  hashtag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'hashtag',
      freezeTableName: true,
      timestamps: false,
    },
  );
  return hashtag;
};

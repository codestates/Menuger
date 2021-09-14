'use strict';
const { Model } = require('sequelize');
module.exports = sequelize => {
  class subscription extends Model {
    static associate(models) {
      subscription.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      subscription.belongsTo(models.user, {
        foreignKey: 'target_user_id',
        targetKey: 'id',
      });
    }
  }
  subscription.init(
    {},
    {
      sequelize,
      modelName: 'subscription',
      freezeTableName: true,
      timestamps: false,
    },
  );
  return subscription;
};

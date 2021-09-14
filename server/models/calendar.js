'use strict';
const { Model } = require('sequelize');
module.exports = sequelize => {
  class calendar extends Model {
    static associate(models) {
      calendar.belongsTo(models.user, {
        foreignKey: 'user_id',
      });
      calendar.hasMany(models.calendar_column, {
        foreignKey: 'calendar_id',
        sourceKey: 'id',
      });
    }
  }
  calendar.init(
    {},
    {
      sequelize,
      modelName: 'calendar',
      freezeTableName: true,
      timestamps: false,
    },
  );
  return calendar;
};

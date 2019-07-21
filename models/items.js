'use strict';
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define('items', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    body: DataTypes.STRING,
    state: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  items.associate = function(models) {
    // associations can be defined here
    items.belongsTo(models.lists);
  };
  return items;
};

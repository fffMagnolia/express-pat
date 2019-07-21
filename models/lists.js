'use strict';
module.exports = (sequelize, DataTypes) => {
  const lists = sequelize.define('lists', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    underscored: true,
  });
  lists.associate = function(models) {
    // associations can be defined here
    lists.hasMany(models.items, { foreignKey: 'list_id'} );
  };
  return lists;
};

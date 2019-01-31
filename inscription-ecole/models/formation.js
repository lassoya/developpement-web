'use strict';
module.exports = (sequelize, DataTypes) => {
  var formation = sequelize.define('formation', {
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    cost: DataTypes.FLOAT,
  }, {});
  formation.associate = function(models) {
    // associations can be defined here
      formation.belongsToMany(models.user, {through: 'UserForm'});
  };
  return formation;
};
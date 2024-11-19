'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Vehicle, { foreignKey: 'typeId', as: 'vehicles' });
    }
  }
  VehicleType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    wheels: {
      type: DataTypes.INTEGER,  // 2 or 4 wheels, for example
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'VehicleType',
    timestamps: true,
  });
  return VehicleType;
};
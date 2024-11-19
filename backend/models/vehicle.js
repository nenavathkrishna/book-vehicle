'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.VehicleType, { foreignKey: 'typeId', as: 'vehicleType' });
      this.hasMany(models.Booking, { foreignKey: 'vehicleId', as: 'bookings' });

    }
  }
  Vehicle.init({
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'VehicleTypes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Vehicle',
    timestamps: true,
  });
  return Vehicle;
};
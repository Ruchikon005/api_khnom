const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_detail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: { type: DataTypes.STRING,allowNull: true},
        lastName: { type: DataTypes.STRING,allowNull: true},
        address: { type: DataTypes.STRING,allowNull: true},
        
    };

   

    const UserDetail = sequelize.define('userdetails', attributes);

    return UserDetail;
}
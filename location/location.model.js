const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        location_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        location_name: { type: DataTypes.STRING, allowNull: false },
        location_detail: { type: DataTypes.STRING, allowNull: false },
        lat: { type: DataTypes.STRING, allowNull: false },
        lng: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    const Location = sequelize.define('location', attributes, options);

    return Location;
}
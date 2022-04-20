const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        invoice_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        name_location: { type: DataTypes.STRING, allowNull: false },
        customer_name: { type: DataTypes.STRING, allowNull: false },
        customer_phone: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.STRING, allowNull: false },
        time: { type: DataTypes.STRING, allowNull: false },
        status_pay: { type: DataTypes.STRING, allowNull: false },
        receipt_status: { type: DataTypes.STRING, allowNull: false },
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

    const Invoice = sequelize.define('invoice', attributes, options);

    return Invoice;
}
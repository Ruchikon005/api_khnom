const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_detail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: { type: DataTypes.STRING,},
        lastName: { type: DataTypes.STRING,},
        name: {type: DataTypes.STRING},
        type: { type: DataTypes.STRING },
        data: { type: DataTypes.BLOB('long') },
    };

   

    const UserDetail = sequelize.define('userdetails', attributes);

    return UserDetail;
}
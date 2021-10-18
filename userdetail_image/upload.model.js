const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userimage_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: { type: DataTypes.STRING },
        image_path: { type: DataTypes.STRING },
        // data: { type: DataTypes.BLOB('long') },
    };

   

    const Image = sequelize.define('userimages', attributes);

    return Image;
}
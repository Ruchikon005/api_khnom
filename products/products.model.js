const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: { type: DataTypes.STRING },
        category: { type: DataTypes.STRING },
        image_path: { type: DataTypes.STRING },
        // data_image: { type: DataTypes.BLOB('long') },
        product_detail: { type: DataTypes.STRING },
        price: { type: DataTypes.INTEGER },
        quantity: { type: DataTypes.INTEGER },
        
    };

   

    const Image = sequelize.define('products', attributes);

    return Image;
}
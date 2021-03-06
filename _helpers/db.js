const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.UserDetail = require('../userdetails/userdetails.model')(sequelize);
    db.UserImage = require('../userdetail_image/upload.model')(sequelize);
    db.Store = require('../stores/store.model')(sequelize);
    db.Product = require('../products/products.model')(sequelize);
    db.Location = require('../location/location.model')(sequelize);
    db.Cart = require('../cart/cart.model')(sequelize);
    db.Invoice = require('../invoice/invoice.model')(sequelize);
    

    db.UserDetail.belongsTo(db.User, {foreignKey: { name: 'uid', field: 'uid', allowNull: false }});
    db.UserImage.belongsTo(db.User, {foreignKey: { name: 'uid', field: 'uid', allowNull: false }})
    db.Store.belongsTo(db.User, { foreignKey: { name: 'uid', field: 'uid', allowNull: false  } });
    db.Product.belongsTo(db.Store, { foreignKey: { name: 'stid', field: 'stid', allowNull: false  } });
    db.Location.belongsTo(db.Store, { foreignKey: { name: 'stid', field: 'stid', allowNull: false  } });
    db.Cart.belongsTo(db.User, { foreignKey: { name: 'uid', field: 'uid', allowNull: false  } });
    db.Invoice.belongsTo(db.Store, { foreignKey: { name: 'stid', field: 'stid', allowNull: false  } });



    // sync all models with database
    await sequelize.sync();
}
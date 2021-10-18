const db = require('_helpers/db');

module.exports = {
    getByStid,
};



//get userdetail by uid(foreign key)
async function getByStid(uid){
    return await getProductStid(uid);
}



// helper functions

async function getProductStid(uid) {
    // const Store = await db.Store.findOne({where: {uid} in db.Store})
    // console.log(Store);
    const Product = await db.Product.findAll({where: {uid} in db.Store});
    if (!Product) throw 'Detail not found';
    return Product;
}
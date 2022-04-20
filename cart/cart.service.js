const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getMyCartbyUid,
    getByuid,
    getById,
    create,
    update,
    delete: _delete
};


async function getMyCartbyUid(uid) {
    return await getItemid(uid);
}

async function getByuid(uid) {
    return await getlocationUid(uid);
}

async function getById(user_id) {
    return await getUser(user_id);
}

async function create(params) {
    
    // save user
    await db.Cart.create(params);
}

async function update(uid,params) {
    const cart = await getCart(uid);
    Object.assign(cart, params);
    await cart.save();
    return cart.get();
}

async function _delete(user_id) {
    const user = await getUser(user_id);
    await user.destroy();
}

// helper functions

// async function getProduct(uid) {
//     const Cart = await db.Cart.findByPk(uid);
//     if (!Cart) {
//         throw 'User not found';
//     }
//     else {
//         get
//     }
    
// }

async function getItemid(uid) {
    const itemId = await db.Cart.findAll({attributes: ['item_id'],where: {uid:uid}});
    const itemIdJson = JSON.stringify(itemId);
    const itemIdParse = JSON.parse(itemIdJson);
    console.log(itemIdParse[0].item_id);
    const data = itemIdParse[0].item_id
    return await getProduct(data);
}

async function getProduct(product_id) {
    const Product = await db.Product.findOne({where: {product_id: product_id}});
    if (!Product) throw 'Detail not found';
    return Product;
}

async function getCart(uid) {
    const cart = await db.Cart.findOne({where: {uid: uid}});
    if (!cart) throw 'cart not found';
    return cart;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
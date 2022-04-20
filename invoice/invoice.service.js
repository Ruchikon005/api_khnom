const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getBycustomerName,
    getByuid,
    getBystid,
    getById,
    create,
    update,
    delete: _delete
};



async function getBycustomerName(customer_name) {
    const Invoice = await db.Invoice.findAll({where: {customer_name: customer_name}});
    if (!Invoice) throw 'Detail not found';
    return Invoice;
}

async function getBystid(stid) {
    const Invoice = await db.Invoice.findAll({where: {stid: stid}});
    if (!Invoice) throw 'Detail not found';
    return Invoice;
}

async function getByIdstore(store_id) {
    return await getstore(store_id);
}

async function getByuid(uid) {
    return await getlocationUid(uid);
}

async function getById(user_id) {
    return await getUser(user_id);
}

async function create(params) {
    // save user
    await db.Invoice.create(params);
}

async function update(user_id, params) {
    const user = await getUser(user_id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(user_id) {
    const user = await getUser(user_id);
    await user.destroy();
}

// helper functions

async function getstore(store_id) {
    const store = await db.Store.findByPk(store_id);
    if (!store) throw 'User not found';
    return store;
}

async function getlocationUid(uid) {
    const stid = await db.Store.findAll({attributes: ['store_id'],where: {uid:uid}});
    const stidJson = JSON.stringify(stid);
    const stidParse = JSON.parse(stidJson);
    console.log(stidParse[0].store_id);
    const data = stidParse[0].store_id
    return await getLocationStid(data);
}

async function getLocationStid(stid) {
    const Location = await db.Location.findAll({where: {stid: stid}});
    if (!Location) throw 'Detail not found';
    return Location;
}

async function getUser(user_id) {
    const user = await db.User.findByPk(user_id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getByIdstore,
    getByUid,
    getById,
    create,
    update,
    delete: _delete
};


async function getByIdstore(store_id) {
    return await getstore(store_id);
}

async function getByUid(uid) {
    return await getstoreUid(uid);
}

async function getById(user_id) {
    return await getUser(user_id);
}

async function create(params) {
    // validate
    if (await db.Store.findOne({ where: { store_name: params.store_name } })) {
        throw 'Storename "' + params.store_name + '" is already taken';
    }
    // save user
    await db.Store.create(params);
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

async function getstoreUid(uid) {
    const store = await db.Store.findOne({where: { uid } });
    if (!store) throw 'User not found';
    return store;
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
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.user_id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(user_id) {
    return await getUser(user_id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username} })) {
        throw 'Username "' + params.username + '" is already taken';
    }
    else if (await db.User.findOne({ where: { email: params.email} })) {
        throw 'Email "' + params.email + '" is already taken';
    }
    else if (await db.User.findOne({ where: { tel: params.tel} })) {
        throw 'tel "' + params.tel + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
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

async function getUser(user_id) {
    const user = await db.User.findByPk(user_id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
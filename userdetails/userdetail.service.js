const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    create,
    getByUid,
};


// create detail
async function create(params) {
    // save user
    await db.Store.create(params);
}

//get userdetail by uid(foreign key)
async function getByUid(uid){
    return await getDetailUid(uid);
}



// helper functions

async function getDetailUid(uid) {
    const Detail = await db.UserDetail.findOne({where: { uid } });
    if (!Detail) throw 'Detail not found';
    return Detail;
}
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getByUid,
};



//get userdetail by uid(foreign key)
async function getByUid(uid){
    return await getImageUid(uid);
}



// helper functions

async function getImageUid(uid) {
    const Image = await db.UserImage.findOne({where: { uid } });
    if (!Image) throw 'Detail not found';
    return Image;
}
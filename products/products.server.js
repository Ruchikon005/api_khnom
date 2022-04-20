const { response } = require('express');
const db = require('_helpers/db');

module.exports = {
    getByStid,
    getByid,
    getAll,
    getByCate,

};



//get All product
async function getAll(){
    return await db.Product.findAll();
}

//get product by uid
async function getByStid(uid){
    const stid = await db.Store.findAll({attributes: ['store_id'],where: {uid:uid}});
    const stidJson = JSON.stringify(stid);
    const stidParse = JSON.parse(stidJson);
    console.log(stidParse[0].store_id);
    const data = stidParse[0].store_id
    return await getProductStid(data);
}

async function getByid(id){
    const Product = await db.Product.findOne({where: {product_id: id}});
    if (!Product) throw 'Detail not found';
    return Product;
}

//get category 
async function getByCate(cate){
    const Product = await db.Product.findAll({where: {category: cate}});
    if (!Product) throw 'Detail not found';
    return Product;
}



// helper functions

async function getProductStid(stid) {
    const Product = await db.Product.findAll({where: {stid: stid}});
    if (!Product) throw 'Detail not found';
    return Product;
}
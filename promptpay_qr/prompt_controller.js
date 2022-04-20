const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../_helpers/db');
const promptService = require('./prompt_service');
const generatePayload = require('promptpay-qr');
const QRCode = require('qrcode')


// routes
router.post('/Qr/:uid', createQr );


module.exports = router;

async function createQr(req, res) {
    const amount = parseFloat(req.body.amount);
    const mobileNumber = await getPromptbyStid(req.params.uid);
    const payload = generatePayload(mobileNumber, { amount });
    const option = {
        color: {
            dark: '#000',
            light: '#fff'
        }
    }
    QRCode.toDataURL(payload, option, (err, url) => {
        if(err) {
            console.log('generate fail')
            return res.status(400).json({
                RespCode: 400,
                RespMessage: 'bad : ' + err
            })  
        } 
        else {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good',
                Result: url
            })  
        }

    })
}

async function getPromptbyStid(uid) {
    const stid = await db.Store.findAll({attributes: ['store_id'],where: {uid:uid}});
    const stidJson = JSON.stringify(stid);
    const stidParse = JSON.parse(stidJson);
    console.log(stidParse[0].store_id);
    const data = stidParse[0].store_id
    return await getPromptnumber(data);
}

async function getPromptnumber(stid) {
    const promptpay_number = await db.Store.findAll({attributes: ['promptpay_number'],where: {store_id: stid}});
    const promptnumberJson = JSON.stringify(promptpay_number);
    const promptnumberJsonParse = JSON.parse(promptnumberJson);
    console.log(promptnumberJsonParse[0].promptpay_number);
    const data = promptnumberJsonParse[0].promptpay_number
    return data;
}



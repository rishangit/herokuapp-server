const express = require('express');
//const SendResponse = require('../common/response');
const router = express.Router();
const debuge = false;


router.post('*', (req, res) => {
    console.log('api request')
    // if (req.session.user || req.url == "/signin_auth"  || debuge) { 
        let [funct,control] =  req.url.split('_');
        var Controller = require(`./controller/${control}_controller`);
        Controller[funct.substr(1)](req, res);
    // }

})

module.exports = router;
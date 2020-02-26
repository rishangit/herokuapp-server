const express = require('express');

const router = express.Router();
const debuge = false;
router.get('*', (req, res) => {
    console.log('aaa')
    // if (req.session.user || req.url == "/signin_auth"  || debuge) { 
        let [funct,control] =  req.url.split('_');
        var Controller = require(`./controller/${control}_controller`);
        Controller[funct.substr(1)](req, res);
    // }

})

module.exports = router;
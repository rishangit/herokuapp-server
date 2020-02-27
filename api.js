const express = require('express');
const {clents, nests} = require('./common/const')
const router = express.Router();
const debuge = false;
global.CurrentIndex = 0;
global.NumberList = [1,2,4,5,8,9,10];
router.get('*', (req, res) => {






    // if (req.session.user || req.url == "/signin_auth"  || debuge) { 
        let [funct,control] =  req.url.split('_');
        var Controller = require(`./controller/${control}_controller`);
        Controller[funct.substr(1)](req, res);
    // }

})

module.exports = router;
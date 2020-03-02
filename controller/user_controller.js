const Access = require('../data_access/user_access');
const SendResponse = require('../common/responce');

module.exports = {
    add: async (req, res) => {
        var sendResponse = new SendResponse(res);
        var data = req.body;
        try {
            var docs = await Access.save(data).then();
            sendResponse.sendSuccessObj(docs);
        } catch (error) {
        }
    },

    list: async (req, res) => {
        var sendResponse = new SendResponse(res);
        var data = req.body;
        try {
            var docs = await Access.list(data).then();
            sendResponse.sendSuccessList(docs);
        } catch (error) {
        }
    },

    new:(req, res)=>{
        var sendResponse = new SendResponse(res);
        const listeningController = require('./listening_controller');
        listeningController.toall();
        sendResponse.sendSuccessEmpty();
        
    }

}





const userAccess = require('../data_access/user_access')
const SendResponse = require('../common/responce');

console.log('user controller ')
module.exports = {

    add: async (req, res) => {
        var sendResponse = new SendResponse(res);
        var user = req.body;
        try {
            var docs = await userAccess.save(user).then();
            sendResponse.sendSuccessObj(docs);
        } catch (error) {
        }
    },

    list: async (req, res) => {
        var sendResponse = new SendResponse(res);
        var param = req.body;
        try {
            var docs = await userAccess.list(param).then();
            sendResponse.sendSuccessList(docs);
        } catch (error) {
        }
    }

}



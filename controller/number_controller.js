const SendResponse = require('../common/responce');


module.exports = {
    current: (req, res) => {
        var sendResponse = new SendResponse(res);
        let number =NumberList[1][CurrentIndex]
        sendResponse.sendSuccessObj(number);
    },

    nextnumber: (req, res) => {
        var sendResponse = new SendResponse(res);
        CurrentIndex = CurrentIndex++;
        console.log('CurrentIndex', CurrentIndex)
        let number = NumberList[CurrentIndex];
        console.log('number', number)

        sendResponse.sendSuccessObj(number);
    }
}

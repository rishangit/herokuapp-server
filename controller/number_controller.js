const Access = require("../data_access/number_access");
const SendResponse = require("../common/responce");

module.exports = {
  current: (req, res) => {
    var sendResponse = new SendResponse(res);
    let number = NumberList[1][CurrentIndex];
    sendResponse.sendSuccessObj(number);
  },

  nextnumber: (req, res) => {
    var sendResponse = new SendResponse(res);

    sendResponse.sendSuccessObj(1);
  },

  get: async (req, res) => {
    var data = req.body;
    var sendResponse = new SendResponse(res);
    try {
      var doc = await Access.get({_id:'current'}).then();
      sendResponse.sendSuccessObj(doc);
    } catch (error) {}
  },

  next: async (req, res) => {
    var data = req.body;
    var sendResponse = new SendResponse(res);
    try {
      var savedDoc = await Access.get({_id:'current'}).then();
      if(savedDoc){  
        var updatetedDoc = {...savedDoc, number : savedDoc.number + 1}    
        var doc = await Access.update(updatetedDoc).then();
        sendResponse.sendSuccessObj(doc);
      }else{
        var doc = await Access.save({_id:'current', number:0}).then();
        sendResponse.sendSuccessObj(doc);
      }
      
    } catch (error) {}
  },

  add: async (req, res) => {
    console.log("number", "add");
    var sendResponse = new SendResponse(res);
    var data = req.body;
    try {
      var docs = await Access.save(data).then();
      sendResponse.sendSuccessObj(docs);
    } catch (error) {}
  },

  update: async (req, res) => {
    var sendResponse = new SendResponse(res);
    var data = req.body;
    try {
      var doc = await Access.update(data).then();
      sendResponse.sendSuccessObj(doc);
    } catch (error) {}
  }
};

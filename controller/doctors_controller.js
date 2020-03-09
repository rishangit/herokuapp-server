const Access = require("../data_access/doctors_access");
const SendResponse = require("../common/responce");

const add = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  try {
    var docs = await Access.save(data).then();
    sendResponse.sendSuccessObj(docs);
  } catch (error) {}
}

const list =  async (req, res) => {
    var sendResponse = new SendResponse(res);
    var data = req.body;
    try {
        var docs = await Access.list(data).then();
        sendResponse.sendSuccessList(docs);
    } catch (error) {
    }
}

module.exports = {
  add,
  list
};

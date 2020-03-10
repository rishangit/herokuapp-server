const Access = require("../data_access/number_access");
const SendResponse = require("../common/responce");
const Listening = require("./listening_controller");

const next = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var savedDoc = await Access.get({ _id: "current" }).then();
    if (savedDoc) {
      var updatetedDoc = { ...savedDoc, number: savedDoc.number + 1 };
      var doc = await Access.update(updatetedDoc).then();
      sendResponse.sendSuccessObj(doc);
      Listening.toall(doc);
    } else {
      var doc = await Access.save({ _id: "current", number: 0 }).then();
      sendResponse.sendSuccessObj(doc);
      Listening.toall(doc);
    }
  } catch (error) {}
};

const get = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var doc = await Access.get(data).then();
    sendResponse.sendSuccessObj(doc);
  } catch (error) {}
};

module.exports = {
  get,
  next
};

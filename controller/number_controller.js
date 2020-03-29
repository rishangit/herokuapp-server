const Access = require("../data_access/number_access");
const SendResponse = require("../common/responce");
const Listening = require("./listening_controller");
const commonData = require("../common/common_data");

const next = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var savedDoc = await Access.get({ _id: "current" }).then();
    if (savedDoc) {
      var updatetedDoc = { ...savedDoc, number: savedDoc.number + 1 };
      commonData.setData(updatetedDoc, null);
      var doc = await Access.update(updatetedDoc).then();
      sendResponse.sendSuccessObj(doc);
      Listening.toall(doc);
    } else {
      let newDoc = { _id: "current", number: 0 }
      commonData.setData(newDoc, null);
      var doc = await Access.save(newDoc).then();
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

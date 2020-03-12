const Access = require("../data_access/clientnumber_access");
const SendResponse = require("../common/responce");
const Listening = require("./listening_controller");

const next = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var savedDoc = await Access.get({ docId: "current" }).then();
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
  console.log("data", data);
  var sendResponse = new SendResponse(res);
  try {
    var doc = await Access.get(data).then();
    sendResponse.sendSuccessObj(doc);
  } catch (error) {}
};

const nextNumber = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var docs = await Access.list(data).then();
    let doc = null;
    if (docs.length == 0) {
      doc = { nextNumber: 1 };
    }
    sendResponse.sendSuccessObj(doc);
  } catch (error) {}
};

const add = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  try {
    var docs = await Access.save(data).then();
    sendResponse.sendSuccessObj(docs);
  } catch (error) {}
};

module.exports = {
  get,
  next,
  add,
  nextNumber
};

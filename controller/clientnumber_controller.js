const Access = require("../data_access/clientnumber_access");
const SendResponse = require("../common/responce");
const Listening = require("./listening_controller");

const nextNumber = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var docs = await Access.list(data).then();
    let doc = null;
    if (docs.length == 0) {
      doc = { nextNumber: 1 };
    } else {
      doc = { nextNumber: docs[docs.length - 1].number + 1 };
    }
    sendResponse.sendSuccessObj(doc);
  } catch (error) {}
};

const bookNumber = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  try {
    var docs = await Access.save(data).then();
    sendResponse.sendSuccessObj(docs);
  } catch (err) {}
};

module.exports = {
  nextNumber,
  bookNumber
};

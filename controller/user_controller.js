const Access = require("../data_access/user_access");
const SendResponse = require("../common/responce");
const commonData = require("../common/common_data");
const Enums = require('../common/enums');
const bcrypt = require("bcrypt");

const add = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  commonData.setData(data, null);
  let { mobile } = data;
  var doc = await Access.get({ mobile }).then();
  if (doc) {
    sendResponse.sendErrorMsg(
      Enums.UserErrorType.EXISTING_USER,
      "[ERROR|USER|SAVE|Existing user]"
    );
  } else {
    let hashPass = await newHash(data.password);
    data = { ...data, password: hashPass };
    try {
      var docs = await Access.save(data).then();
      sendResponse.sendSuccessObj(docs);
    } catch (error) {}
  }
};

const list = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  try {
    var docs = await Access.list(data).then();
    sendResponse.sendSuccessList(docs);
  } catch (error) {}
};

const newHash = param =>
  new Promise((resolve, reject) => {
    bcrypt.hash(param, 10, function(err, hash) {
      resolve(hash);
    });
  });

module.exports = {
  add,
  list
};

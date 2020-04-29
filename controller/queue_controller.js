const Access = require('../data_access/queue_access');
const ClientAccess = require('../data_access/clientnumber_access');
const DoctorAccess = require('../data_access/doctors_access');
const SendResponse = require('../common/responce');
const commonData = require('../common/common_data');
const Enums = require('../common/enums');

const add = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  commonData.setData(data, null);
  let { bookingId } = data;
  var doc = await Access.get({ bookingId }).then();
  if (doc) {
    sendResponse.sendErrorMsg(
      Enums.QueueErrorType.EXISTING_IN_QUEUE,
      '[ERROR|QUEUE|SAVE|Existing Booking]',
    );
  } else {
    try {
      var docs = await Access.save(data).then();
      sendResponse.sendSuccessObj(docs);
    } catch (error) {}
  }
};

const bookdetails = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var docs = await ClientAccess.list(data).then();
    var fulldetails = await Promise.all(
      docs.map(async doc => {
        docotorDoc = await DoctorAccess.get({ _id: doc.docId }).then();
        return {
          ...doc,
          docotor: { ...docotorDoc },
        };
      }),
    );
    sendResponse.sendSuccessList(fulldetails);
  } catch (error) {}
};

const list = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  try {
    var docs = await Access.list(data).then();
    sendResponse.sendSuccessList(docs);
  } catch (error) {}
};

const remove = async (req, res) => {
  var sendResponse = new SendResponse(res);
  var data = req.body;
  try {
    var docs = await Access.remove(data).then();
    sendResponse.sendSuccessObj(docs);
  } catch (error) {}
};

const changeStatus = async (req, res) => {
  const sendResponse = new SendResponse(res);
  const data = req.body;
  try {
    var doc = await Access.get({ _id: data._id }).then();
    doc = { ...doc, active: data.active };
    var updated = await Access.update(doc).then();
    sendResponse.sendSuccessObj(updated);
  } catch (error) {}
};

module.exports = {
  bookdetails,
  add,
  list,
  remove,
  changeStatus,
};

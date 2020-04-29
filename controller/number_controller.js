const Access = require('../data_access/number_access');
const SendResponse = require('../common/responce');
const Listening = require('./listening_controller');
const commonData = require('../common/common_data');
const QueueAccess = require('../data_access/queue_access');
const Enums = require('../common/enums');

const next = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    const { roomId, docId, queueId } = data;
    if (queueId) {
      const updatequeue = await updateCompletedQueue(queueId);
    }

    const nextInQueue = await getFromList(data);

    if (nextInQueue) {
      const { name, number, docId, _id, bookingId } = nextInQueue;
      let updatetedDoc = {
        name,
        number,
        docId,
        bookingId,
        queueId: _id,
        roomId: roomId,
      };
      commonData.setData(updatetedDoc, null);

      var doc = null;
      let savedDoc = await Access.get({ roomId, docId }).then();
      if (!savedDoc) {
        doc = await Access.save(updatetedDoc).then();
      } else {
        doc = await Access.update({ ...savedDoc, ...updatetedDoc }).then();
      }
      sendToDisplay(doc);
      sendResponse.sendSuccessObj(doc);
    } else {
      sendResponse.sendSuccessObj({});
    }
  } catch (error) {}
};

const get = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var doc = await Access.get(data).then();
    if (doc) sendResponse.sendSuccessObj(doc);
    else sendResponse.sendSuccessObj({});
  } catch (error) {}
};

const getFromList = async ({ docId }) => {
  let obj = {
    filters: [{ active: true }],
    sorts: { number: Enums.Sort.ASD },
  };
  if (docId) {
    obj.filters = [...obj.filters, { docId }];
  }
  try {
    var queueList = await QueueAccess.list(obj).then();
  } catch (error) {}
  var first = null;
  if (queueList.length > 0) first = queueList[0];
  return first;
};

const updateCompletedQueue = async queueId => {
  var doc = await QueueAccess.get({ _id: queueId }).then();
  doc = { ...doc, active: false };
  var updated = await QueueAccess.update(doc).then();
  return updated;
};

const sendToDisplay = doc => {
  Listening.sendFor({
    for: Enums.ListeningFor.CLINIC_UPDATE,
    from: doc.roomId,
    obj: doc,
  });
};

module.exports = {
  get,
  next,
};

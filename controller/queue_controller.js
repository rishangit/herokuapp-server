const Access = require("../data_access/queue_access");
const ClientAccess = require("../data_access/clientnumber_access");
const DoctorAccess = require("../data_access/doctors_access");
const SendResponse = require("../common/responce");

const bookdetails = async (req, res) => {
  var data = req.body;
  var sendResponse = new SendResponse(res);
  try {
    var docs = await ClientAccess.list(data).then();
    var fulldetails = await Promise.all(docs.map(async doc => {
      docotorDoc = await DoctorAccess.get({_id:doc.docId}).then();
      return {
        ...doc,
        docotor: { ...docotorDoc }
      };
    }));
    sendResponse.sendSuccessList(fulldetails);
  } catch (error) {}
};

module.exports = {
  bookdetails
};

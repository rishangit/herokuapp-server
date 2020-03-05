let { clients, nests } = require("../common/const");

const request = (req, res) => {
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
    startTimeOut: timeOutCount
  };
  newClient.startTimeOut(clientId);
  clients.push(newClient);
  console.log('listning start',newClient.id )
  req.on("close", () => {
    console.log(`Connection closed ${clientId} `);
    clients = clients.filter(c => c.id !== clientId);
  });
};

const timeOut = clientId => {
  console.log("timeOut", clientId);
};

const timeOutCount = clientId => {
  var self = this;
  var clientId = clientId;
  setTimeout(() => {
      var client = clients.find(c => c.id == clientId);
      if(client && client.res){
        client.res.send({ typ: 3 });
      }
  }, 36000 * 2);
};

const toall = obj => {
  clients.forEach(c => {
    console.log("send request to all");
    let doc = {};
    if (obj) doc = { typ: 2, obj };
    else doc = { typ: 3 };
    c.res.send(doc);
  });
};

module.exports = {
  request,
  toall
};

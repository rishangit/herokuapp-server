let { clients } = require('../common/const');
const Enums = require('../common/enums');

const request = (req, res) => {
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
    startTimeOut: timeOutCount,
  };

  const data = req.body;
  const clientFromFor = `${data.for}_${data.from}`;

  if (!clients[clientFromFor]) {
    clients[clientFromFor] = [];
  }

  clients[clientFromFor].push(newClient);
  newClient.startTimeOut({ clientId, clientFromFor });
  console.log('clients :', clients[clientFromFor].length);
  req.on('close', () => {
    removeClient({ clientId, clientFromFor });
  });
};

const timeOut = clientId => {
  console.log('timeOut', clientId);
};

const timeOutCount = ({ clientId, clientFromFor }) => {
  var self = this;
  var clientId = clientId;
  setTimeout(() => {
    var client = clients[clientFromFor].find(c => c.id == clientId);
    if (client && client.res) {
      client.res.send({ typ: 3 });
      removeClient({ clientId, clientFromFor });
    }
  }, 36000 * 2);
};

const toall = obj => {
  clients.forEach(c => {
    console.log('send request to all');
    let doc = {};
    if (obj) doc = { typ: 2, obj };
    else doc = { typ: 3 };
    c.res.send(doc);
  });
};

const sendFor = data => {
  const clientFromFor = `${data.for}_${data.from}`;
  console.log('sendFor', clientFromFor);
  clients[clientFromFor].forEach(c => {
    let doc = {};
    if (data.obj) doc = { typ: 2, obj: data.obj };
    else doc = { typ: 3 };
    console.log('send ', c.id);
    c.res.send(doc);
    removeClient({ clientId: c.id, clientFromFor });
  });
};

const removeClient = ({ clientId, clientFromFor }) => {
  clients[clientFromFor] = clients[clientFromFor].filter(
    c => c.id !== clientId,
  );
};
module.exports = {
  request,
  toall,
  sendFor,
};

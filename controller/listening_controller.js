let { clients, nests } = require("../common/const");

module.exports = {
  request: (req, res) => {
    const clientId = Date.now();
    const newClient = {
      id: clientId,
      res
    };
    clients.push(newClient);
    console.log("add clients ");
    req.on("close", () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(c => c.id !== clientId);
    });
  },

  toall: () => {
    const docs = [
      { name: "Thinira", age: "25", _id: "geG3JVUW1E7FqIkC" },
      { name: "Sahan", age: "24", _id: "yBExiIlWreJWtBi3" }
    ];
    docs[0].name = docs[0].name + Math.random();
    docs[1].name = docs[1].name + Math.random();
    clients.forEach(c => {
      console.log("send request to all");
      let obj = { typ: 1, lst: docs };
      c.res.send(obj);
    });
  }
};

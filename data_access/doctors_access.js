const constant = require("../common/const");
const Datastore = require("nedb");
const db = new Datastore({
  filename: constant.dbpath + "doctors.db",
  autoload: true
});

const save = data => {
  return new Promise((resolve, reject) => {
    db.insert(data, function(err, doc) {
      if (err) reject(err);
      else resolve(doc);
    });
  });
};

const list = data => {
  return new Promise((resolve, reject) => {
    var queryObj = {};
    if (data.query) {
      var searchString = param.data.query.split(" ").join("|");
      var regex = new RegExp(searchString, "i");
      var reg = { $regex: regex };
      queryObj = {
        $or: [{ firstName: reg }, { lastName: reg }, { mobile: reg }]
      };
    }
    db.find(queryObj).exec((err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
};

module.exports = {
  save,
  list
};

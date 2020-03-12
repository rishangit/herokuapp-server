const constant = require("../common/const");
const Datastore = require("nedb");
const db = new Datastore({
  filename: constant.dbpath + "clientnumber.db",
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

const get = data => {
  return new Promise((resolve, reject) => {
    db.findOne(data, (err, doc) => {
      if (err) reject(err);
      else resolve(doc);
    });
  });
};

const update = data => {
  return new Promise((resolve, reject) => {
    db.update({ _id: data._id }, { $set: data }, {}, (err, doc) => {
      if (err) reject(err);
      else {
        if (doc == 1) {
          resolve(data);
        }
      }
    });
  });
};

const list = data => {
  return new Promise((resolve, reject) => {
    //var queryObj = {};
    // if (data.query) {
    //   var searchString = param.data.query.split(" ").join("|");
    //   var regex = new RegExp(searchString, "i");
    //   var reg = { $regex: regex };
    //   queryObj = {
    //     $or: [{ firstName: reg }, { lastName: reg }, { email: reg }]
    //   };
    // }
    query = {};
    sort = [];
    if (data.filters && data.filters.length > 0) {
      query = {
        ...query,
        $and: [...data.filters]
      }
    }
    if(data.sorts){
      sort = data.sorts
    }



    db.find(query).exec((err, docs) => {
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
  get,
  update,
  list
};

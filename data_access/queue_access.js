const constant = require('../common/const');
const Datastore = require('nedb');
const db = new Datastore({
  filename: constant.dbpath + 'queue.db',
  autoload: true,
});

const save = (data) => {
  return new Promise((resolve, reject) => {
    db.insert(data, function (err, doc) {
      if (err) reject(err);
      else resolve(doc);
    });
  });
};

const list = (data) => {
  return new Promise((resolve, reject) => {
    query = {};
    sort = [];
    if (data.filters && data.filters.length > 0) {
      query = {
        ...query,
        $and: [...data.filters],
      };
    }
    if (data.sorts) {
      sort = data.sorts;
    }
    db.find(query)
      .sort(sort)
      .exec((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
};

const get = (data) => {
  return new Promise((resolve, reject) => {
    db.findOne(data, (err, doc) => {
      if (err) reject(err);
      else {
        resolve(doc);
      }
    });
  });
};

const remove = (data) => {
  return new Promise((resolve, reject) => {
    db.remove(data, (err, doc) => {
      if (err) reject(err);
      else {
        if (doc == 1) {
          resolve(data);
        }
      }
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


module.exports = {
  list,
  save,
  get,
  remove,
  update
};

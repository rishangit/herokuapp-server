const constant = require("../common/const");
const Datastore = require("nedb");
const db = new Datastore({
  filename: constant.dbpath + "doctors.db",
  autoload: true
});


const get = data => {
  return new Promise((resolve, reject) => {
    db.findOne(data, (err, doc) => {
      if (err) reject(err);
      else{
        resolve(doc);
      } 
    });
  });
};


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

const remove = data => {
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

// const removeData = data => {
//   db.findOne(data, (err, doc) => {
//     if (doc) {
//       member.archive = true;
//       db.update({ _id: member._id }, { $set: member }, {}, (err, doc) => {
//         if (err) param.error(err);
//         else {
//           if (doc == 1) {
//             param.callBack(this.generateResult(member));
//           }
//         }
//       });
//     }
//   });
// };

module.exports = {
  save,
  list,
  remove,
  get
};

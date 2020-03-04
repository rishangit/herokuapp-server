const constant = require("../common/const");
const Datastore = require("nedb");
const db = new Datastore({
  filename: constant.dbpath + "number.db",
  autoload: true
});

module.exports = {
  save: data => {
    return new Promise((resolve, reject) => {
      db.insert(data, function(err, doc) {
        if (err) reject(err);
        else resolve(doc);
      });
    });
  },

  get: data => {
    return new Promise((resolve, reject) => {
      db.findOne(data, (err, doc) => {
        if (err) reject(err);
        else resolve(doc);
      });
    });
  },

  update: data => {
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
  },


  removeData: function (param) {
    db.findOne(param.data, (err, member) => {
        if (member) {
            member.archive = true;
            db.update({ _id: member._id }, { $set: member }, {}, (err, doc) => {
                if (err)
                    param.error(err);
                else {
                    if (doc == 1) {
                        param.callBack(this.generateResult(member));
                    }
                }
            });

        }
    })
},


};

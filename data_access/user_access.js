const constant = require('../common/const');
const Datastore = require('nedb');
const db = new Datastore({
    filename: constant.dbpath + 'user.db', autoload: true
});

module.exports = {

    save: (data) => {
        return new Promise((resolve, reject) => {
            db.insert(data, function (err, doc) {
                if (err) { reject(err); }
                else { resolve(doc); }
            });
        })
    },

    list: (data) => {
        return new Promise((resolve, reject) => {
            var queryObj = {};
            if (data.query) {
                var searchString = param.data.query.split(' ').join('|');
                var regex = new RegExp(searchString, 'i');
                var reg = { $regex: regex }
                queryObj = { $or: [{ "firstName": reg }, { "lastName": reg }, { "email": reg }] }

            }
            db.find(queryObj).exec((err, docs) => {
                if (err) { reject(err) }
                else {
                    resolve(docs)
                }

                // await  db.count(queryObj).exec((err, count) => {
                //     callBack(count)
                // })
            });
        })

    }
}
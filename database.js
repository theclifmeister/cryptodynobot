const Datastore = require('nedb');
const db = new Datastore({ filename: './store/users.db', autoload: true });

findOne = (query) => {
    return new Promise((resolve, reject) => {
        db.findOne(query, (err, doc) => {
            if(err) return reject(err);
            resolve(doc);
        });
    });
};

update = (query, updateQuery, options) => {
    return new Promise((resolve, reject) => {
        db.update(query, updateQuery, options, (err, numberOfUpdated) => {
            if(err) return reject(err);
            resolve(numberOfUpdated);
        });
    });
}

module.exports = { findOne, update };

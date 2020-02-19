const { db } = require("../config");

module.exports = () => {
  const deleteTablePromise = table =>
    new Promise((resolve, reject) => {
      db.deleteTable(
        {
          TableName: table
        },
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  return deleteTablePromise("NcNewsTable");
};

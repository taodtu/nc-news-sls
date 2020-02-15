const { db } = require("../config");

module.exports = () => {
  const tables = [
    "topicsTable",
    "usersTable",
    "commentsTable",
    "articlesTable"
  ];
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
  return Promise.all(tables.map(table => deleteTablePromise(table)));
};

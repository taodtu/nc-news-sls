const { dbClincet } = require("../config");

module.exports = username =>
  dbClincet
    .get({
      TableName: "usersTable",
      Key: {
        username
      }
    })
    .promise();

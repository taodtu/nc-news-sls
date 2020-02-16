const { dbClincet } = require("../config");

module.exports = () =>
  dbClincet
    .scan({
      TableName: "topicsTable"
    })
    .promise();

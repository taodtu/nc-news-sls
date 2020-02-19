const { dbClincet } = require("../config");

module.exports = () =>
  dbClincet
    .query({
      TableName: "NcNewsTable",
      KeyConditionExpression: "pk = :pkey",
      ExpressionAttributeValues: {
        ":pkey": "Topic"
      }
    })
    .promise();

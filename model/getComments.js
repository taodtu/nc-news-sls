const { dbClincet } = require("../config");

module.exports = queryPamas =>
  dbClincet
    .query({
      TableName: "NcNewsTable",
      IndexName: "GSI-1",
      KeyConditionExpression: "sk = :pkey",
      ExpressionAttributeValues: {
        ":pkey": queryPamas
      },
      ScanIndexForward: false
    })
    .promise();

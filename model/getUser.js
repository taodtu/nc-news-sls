const { dbClincet } = require("../config");

module.exports = username =>
  dbClincet
    .query({
      TableName: "NcNewsTable",
      KeyConditionExpression: "pk = :pkey and sk = :skey",
      ExpressionAttributeValues: {
        ":pkey": "User",
        ":skey": username
      }
    })
    .promise();

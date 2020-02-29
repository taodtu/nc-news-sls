const { dbClincet } = require("../config");

module.exports = ({ username, article_id }) => {
  if (username)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-4",
        KeyConditionExpression: "gsi_pk = :pkey and begins_with(gsi_sk, :skey)",
        ExpressionAttributeValues: {
          ":pkey": "commentIndex",
          ":skey": `${username}#`
        },
        ScanIndexForward: false
      })
      .promise();
  else if (article_id)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-1",
        KeyConditionExpression:
          "gsi_pk = :pkey and begins_with(gsi_2sk, :skey)",
        ExpressionAttributeValues: {
          ":pkey": "commentIndex",
          ":skey": `${article_id}#`
        },
        ScanIndexForward: false
      })
      .promise();
};

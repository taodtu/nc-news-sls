const { dbClincet } = require("../config");

module.exports = ({ author, article_id }) => {
  if (author)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-4",
        KeyConditionExpression: "gsi_pk = :pkey and begins_with(gsi_sk, :skey)",
        ExpressionAttributeValues: {
          ":pkey": "commentIndex",
          ":skey": `${author}#`
        },
        ScanIndexForward: false
      })
      .promise();
  else
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

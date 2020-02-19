const { dbClincet } = require("../config");

module.exports.getAllArticles = () =>
  dbClincet
    .query({
      TableName: "NcNewsTable",
      IndexName: "GSI-1",
      KeyConditionExpression: "gsi_pk = :pkey",
      ExpressionAttributeValues: {
        ":pkey": "articleIndex"
      },
      ScanIndexForward: false
    })
    .promise();

module.exports.getArticlesBy = ({ order_by, author, topic }) => {
  if (order_by && !author && !topic)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-5",
        KeyConditionExpression: "gsi_pk = :pkey",
        ExpressionAttributeValues: {
          ":pkey": "articleIndex"
        },
        ScanIndexForward: false
      })
      .promise();
  if (author)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-4",
        KeyConditionExpression:
          "gsi_pk = :pkey and begins_with(gsi_4sk, :skey)",
        ExpressionAttributeValues: {
          ":pkey": "articleIndex",
          ":skey": `${author}#`
        },
        ScanIndexForward: false
      })
      .promise();
};

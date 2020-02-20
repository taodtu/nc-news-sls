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

module.exports.getArticlesBy = ({ sort_by, author, topic, order = "desc" }) => {
  if (!sort_by && !author && !topic)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-5",
        KeyConditionExpression: "gsi_pk = :pkey",
        ExpressionAttributeValues: {
          ":pkey": "articleIndex"
        },
        ScanIndexForward: order === "desc"
      })
      .promise();
  if (sort_by && !author && !topic)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-5",
        KeyConditionExpression: "gsi_pk = :pkey",
        ExpressionAttributeValues: {
          ":pkey": "articleIndex"
        },
        ScanIndexForward: order !== "desc"
      })
      .promise();
  if (!sort_by && topic)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-2",
        KeyConditionExpression: "gsi_pk = :pkey",
        ExpressionAttributeValues: {
          ":pkey": "articleIndex"
        },
        ScanIndexForward: order !== "desc"
      })
      .promise();
  if (sort_by && topic)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-3",
        KeyConditionExpression: "gsi_pk = :pkey",
        ExpressionAttributeValues: {
          ":pkey": "articleIndex"
        },
        ScanIndexForward: order !== "desc"
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
        ScanIndexForward: order !== "desc"
      })
      .promise();
};

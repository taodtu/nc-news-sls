const { dbClincet, db } = require("../config");

module.exports.getAllArticles = ({ sort_by, order = "desc" }) => {
  if (!sort_by)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-1",
        KeyConditionExpression: "gsi_pk = :pkey",
        ExpressionAttributeValues: {
          ":pkey": "articleIndex"
        },
        ScanIndexForward: order !== "desc",
        Limit: 3
      })
      .promise();
  else
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
};

module.exports.getArticlesBy = ({ sort_by, author, topic, order = "desc" }) => {
  if (!sort_by && topic)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-2",
        KeyConditionExpression: "topic = :pkey",
        ExpressionAttributeValues: {
          ":pkey": topic
        },
        ScanIndexForward: order !== "desc"
      })
      .promise();
  if (sort_by && topic)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-3",
        KeyConditionExpression: "topic = :pkey",
        ExpressionAttributeValues: {
          ":pkey": topic
        },
        ScanIndexForward: order !== "desc"
      })
      .promise();
  if (author)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-4",
        KeyConditionExpression: "gsi_pk = :pkey and begins_with(gsi_sk, :skey)",
        ExpressionAttributeValues: {
          ":pkey": "articleIndex",
          ":skey": `${author}#`
        },
        ScanIndexForward: order !== "desc"
      })
      .promise();
};

module.exports.getArticleByID = article_id =>
  dbClincet
    .query({
      TableName: "NcNewsTable",
      KeyConditionExpression: "pk = :pkey ",
      ExpressionAttributeValues: {
        ":pkey": article_id
      }
    })
    .promise();

module.exports.updateArticleByID = (article_id, inc_votes, created_at) => {
  const updateItem = params =>
    new Promise((resolve, reject) => {
      db.updateItem(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  console.log(article_id, inc_votes, created_at);
  return updateItem({
    TableName: "NcNewsTable",
    Key: {
      pk: { S: article_id },
      sk: { S: created_at }
    },
    UpdateExpression: "set votes = votes + :val",
    ExpressionAttributeValues: {
      ":val": { N: `${inc_votes}` }
    }
  });
};

const { dbClincet } = require("../config");

module.exports = ({ author, article_id }) => {
  if (author)
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-1",
        KeyConditionExpression:
          "gsi_1pk = :pkey and begins_with(gsi_1sk, :skey)",
        ExpressionAttributeValues: {
          ":pkey": "commentsAuthor",
          ":skey": `${author}#`
        },
        ScanIndexForward: false
      })
      .promise();
  else
    return dbClincet
      .query({
        TableName: "NcNewsTable",
        IndexName: "GSI-2",
        KeyConditionExpression:
          "gsi_2pk = :pkey and begins_with(gsi_2sk, :skey)",
        ExpressionAttributeValues: {
          ":pkey": "commentsArticle",
          ":skey": `${article_id}#`
        },
        ScanIndexForward: false
      })
      .promise();
};

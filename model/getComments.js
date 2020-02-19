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
};

const { dbClincet } = require("../config");

module.exports.getComments = ({ username, article_id }) => {
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

module.exports.updateComment = (created_at, inc_votes) => {
  return dbClincet
    .update({
      TableName: "NcNewsTable",
      Key: {
        pk: "comment",
        sk: created_at
      },
      UpdateExpression: "set votes = votes + :val",
      ExpressionAttributeValues: {
        ":val": inc_votes
      },
      ReturnValues: "ALL_NEW"
    })
    .promise();
};
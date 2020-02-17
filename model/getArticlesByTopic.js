const { dbClincet } = require("../config");

module.exports = ({ topic }) =>
  dbClincet
    .query({
      TableName: "articlesTable",
      IndexName: "TopicDatesIndex",
      KeyConditionExpression: "topic = :hkey",
      ExpressionAttributeValues: {
        ":hkey": topic
      }
    })
    .promise();

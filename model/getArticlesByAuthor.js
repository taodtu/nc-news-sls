const { dbClincet } = require("../config");

module.exports = ({ author }) =>
  dbClincet
    .query({
      TableName: "articlesTable",
      IndexName: "AuthorDateIndex",
      KeyConditionExpression: "author = :hkey",
      ExpressionAttributeValues: {
        ":hkey": author
      }
    })
    .promise();

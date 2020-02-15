const { db } = require("../config");

module.exports = async () => {
  const paramsComment = {
    TableName: "commentsTable",
    KeySchema: [
      { AttributeName: "article", KeyType: "HASH" }, //Partition key
      { AttributeName: "created_at", KeyType: "RANGE" } //Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: "article", AttributeType: "S" },
      { AttributeName: "created_at", AttributeType: "S" },
      { AttributeName: "author", AttributeType: "S" },
      { AttributeName: "votes", AttributeType: "N" }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "AuthorDateIndex",
        KeySchema: [
          { AttributeName: "author", KeyType: "HASH" },
          { AttributeName: "created_at", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    ],
    LocalSecondaryIndexes: [
      {
        IndexName: "ArticleVotesIndex",
        KeySchema: [
          { AttributeName: "article", KeyType: "HASH" },
          { AttributeName: "votes", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };
  const createTablePromise = params =>
    new Promise((resolve, reject) => {
      db.createTable(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  return createTablePromise(paramsComment);
};

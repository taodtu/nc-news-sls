const { db } = require("../config");

module.exports = async () => {
  const paramsArticle = {
    TableName: "articlesTable",
    KeySchema: [
      { AttributeName: "topic", KeyType: "HASH" }, //Partition key
      { AttributeName: "title", KeyType: "RANGE" } //Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: "topic", AttributeType: "S" },
      { AttributeName: "created_at", AttributeType: "S" },
      { AttributeName: "author", AttributeType: "S" },
      { AttributeName: "votes", AttributeType: "N" },
      { AttributeName: "title", AttributeType: "S" },
      { AttributeName: "comments_count", AttributeType: "N" }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "AuthorTitleIndex",
        KeySchema: [
          { AttributeName: "author", KeyType: "HASH" },
          { AttributeName: "title", KeyType: "RANGE" }
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
        IndexName: "TopicVotesIndex",
        KeySchema: [
          { AttributeName: "topic", KeyType: "HASH" },
          { AttributeName: "votes", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        }
      },
      {
        IndexName: "TopicDatesIndex",
        KeySchema: [
          { AttributeName: "topic", KeyType: "HASH" },
          { AttributeName: "created_at", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        }
      },
      {
        IndexName: "TopicCommentsIndex",
        KeySchema: [
          { AttributeName: "topic", KeyType: "HASH" },
          { AttributeName: "comments_count", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        }
      },
      {
        IndexName: "TopicAuthorIndex",
        KeySchema: [
          { AttributeName: "topic", KeyType: "HASH" },
          { AttributeName: "author", KeyType: "RANGE" }
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
  return createTablePromise(paramsArticle);
};

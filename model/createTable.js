const { db } = require("../config");

module.exports = async () => {
  const paramsTopic = {
    TableName: "topicsTable",
    KeySchema: [
      { AttributeName: "slug", KeyType: "HASH" } //Partition key
    ],
    AttributeDefinitions: [{ AttributeName: "slug", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };
  var paramsUser = {
    TableName: "usersTable",
    KeySchema: [
      { AttributeName: "username", KeyType: "HASH" } //Partition key
    ],
    AttributeDefinitions: [{ AttributeName: "username", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };
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
          ReadCapacityUnits: 50,
          WriteCapacityUnits: 50
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
      ReadCapacityUnits: 50,
      WriteCapacityUnits: 50
    }
  };
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
        IndexName: "AuthorDateIndex",
        KeySchema: [
          { AttributeName: "author", KeyType: "HASH" },
          { AttributeName: "created_at", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10
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
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };
  const tables = [paramsTopic, paramsUser, paramsComment, paramsArticle];
  const createTablePromise = params =>
    new Promise((resolve, reject) => {
      db.createTable(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  return Promise.all(
    tables.map(tableParams => createTablePromise(tableParams))
  );
};

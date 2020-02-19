const { db } = require("../config");

module.exports = async () => {
  const params = {
    TableName: "NcNewsTable",
    KeySchema: [
      { AttributeName: "pk", KeyType: "HASH" }, //Partition key
      { AttributeName: "sk", KeyType: "RANGE" } //Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: "pk", AttributeType: "S" },
      { AttributeName: "sk", AttributeType: "S" },
      { AttributeName: "gsi-1pk", AttributeType: "S" },
      { AttributeName: "gsi-2pk", AttributeType: "S" },
      { AttributeName: "gsi-3pk", AttributeType: "S" },
      { AttributeName: "gsi-4pk", AttributeType: "S" },
      { AttributeName: "gsi-1sk", AttributeType: "S" },
      { AttributeName: "gsi-2sk", AttributeType: "S" },
      { AttributeName: "gsi-3sk", AttributeType: "S" },
      { AttributeName: "gsi-4sk", AttributeType: "S" }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI-1",
        KeySchema: [
          { AttributeName: "gsi-1pk", KeyType: "HASH" },
          { AttributeName: "gsi-1sk", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: "GSI-2",
        KeySchema: [
          { AttributeName: "gsi-2pk", KeyType: "HASH" },
          { AttributeName: "gsi-2sk", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: "GSI-3",
        KeySchema: [
          { AttributeName: "gsi-3pk", KeyType: "HASH" },
          { AttributeName: "gsi-3sk", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: "GSI-4",
        KeySchema: [
          { AttributeName: "gsi-4pk", KeyType: "HASH" },
          { AttributeName: "gsi-4sk", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };
  const createTablePromise = params =>
    new Promise((resolve, reject) => {
      db.createTable(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  return createTablePromise(params);
};

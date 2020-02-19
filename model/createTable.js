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
      { AttributeName: "gsi_pk", AttributeType: "S" },
      { AttributeName: "gsi_1sk", AttributeType: "S" },
      { AttributeName: "gsi_2sk", AttributeType: "S" },
      { AttributeName: "gsi_3sk", AttributeType: "S" },
      { AttributeName: "gsi_4sk", AttributeType: "S" },
      { AttributeName: "votes", AttributeType: "N" }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI-1",
        KeySchema: [
          { AttributeName: "gsi_pk", KeyType: "HASH" },
          { AttributeName: "gsi_1sk", KeyType: "RANGE" }
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
          { AttributeName: "gsi_pk", KeyType: "HASH" },
          { AttributeName: "gsi_2sk", KeyType: "RANGE" }
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
          { AttributeName: "gsi_pk", KeyType: "HASH" },
          { AttributeName: "gsi_3sk", KeyType: "RANGE" }
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
          { AttributeName: "gsi_pk", KeyType: "HASH" },
          { AttributeName: "gsi_4sk", KeyType: "RANGE" }
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
        IndexName: "GSI-5",
        KeySchema: [
          { AttributeName: "gsi_pk", KeyType: "HASH" },
          { AttributeName: "votes", KeyType: "RANGE" }
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

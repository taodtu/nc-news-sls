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
      { AttributeName: "data", AttributeType: "S" }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI-1",
        KeySchema: [
          { AttributeName: "sk", KeyType: "HASH" },
          { AttributeName: "data", KeyType: "RANGE" }
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

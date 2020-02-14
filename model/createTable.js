const { db } = require("../config");

module.exports = async () => {
  const paramsTopic = {
    TableName: "topicsTable",
    KeySchema: [
      { AttributeName: "slug", KeyType: "HASH" } //Partition key
    ],
    AttributeDefinitions: [{ AttributeName: "slug", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };
  var paramsUser = {
    TableName: "usersTable",
    KeySchema: [
      { AttributeName: "username", KeyType: "HASH" } //Partition key
    ],
    AttributeDefinitions: [{ AttributeName: "username", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };
  const tables = [paramsTopic, paramsUser];
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

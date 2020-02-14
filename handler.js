"use strict";
const { db, dbClincet } = require("./config");
const { topicData, userData } = require("./data/index");

module.exports.seed = async event => {
  try {
    await Promise.all(
      topicData.map(topic =>
        dbClincet
          .put({
            TableName: "topicsTable",
            Item: { slug: topic.slug, description: topic.description }
          })
          .promise()
      )
    );
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "internal error"
      })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Tables are successfully seeded!"
    })
  };
};
module.exports.dropTable = async event => {
  const tables = ["topicsTable", "usersTable"];
  const deleteTablePromise = table => {
    return new Promise((resolve, reject) => {
      db.deleteTable(
        {
          TableName: table
        },
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  };

  try {
    await Promise.all(tables.map(table => deleteTablePromise(table)));
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "internal error"
      })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Tables are successfully deleted!"
    })
  };
};

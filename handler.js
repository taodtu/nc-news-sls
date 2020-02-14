"use strict";
const { db, dbClincet } = require("./config");
const { topicData, userData } = require("./data/index");

module.exports.seed = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Tables are successfully seeded!"
    })
  };
};
module.exports.dropTable = async event => {
  const tables = ["topicsTable", "usersTable"];

  try {
    await Promise.all(
      tables.map(table =>
        db.deleteTable({
          TableName: table
        })
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
      message: "Tables are successfully deleted!"
    })
  };
};

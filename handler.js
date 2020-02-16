"use strict";
//handlers for topic and user table query
const getTable = require("./model/getTable");

module.exports.getTable = async event => {
  try {
    await getTable();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "article table is successfully seeded"
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "get table fails",
        err
      })
    };
  }
};

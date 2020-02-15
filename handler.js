"use strict";
const deleteTable = require("./model/deleteTable");
const seedTable = require("./model/seedTable");
const createTable = require("./model/createTable");
const createArticlesTable = require("./model/createArticlesTable");

module.exports.seed = async event => {
  try {
    await seedTable();
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "seed table fails",
        err
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
  try {
    await deleteTable();
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "delete table fails",
        err
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
module.exports.createTable = async event => {
  try {
    await createTable();
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "create table fails",
        err
      })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Tables are successfully created!"
    })
  };
};

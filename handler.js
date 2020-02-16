"use strict";
//handlers for topic and user table query
const getTopics = require("./model/getTopics");

module.exports.getTopics = async event => {
  try {
    const res = await getTopics();
    const { Items } = res;
    return {
      statusCode: 200,
      body: JSON.stringify({
        topics: Items
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "get topics fails",
        err
      })
    };
  }
};

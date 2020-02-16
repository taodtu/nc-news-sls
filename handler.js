"use strict";
//handlers for topic and user table query
const getTopics = require("./model/getTopics");
const getUser = require("./model/getUser");

module.exports.getTopics = async event => {
  try {
    const { Items } = await getTopics();
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

module.exports.getUser = async event => {
  const { username } = event.pathParameters;
  try {
    const { Item } = await getUser(username);
    if (!Item)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "user not found"
        })
      };
    else
      return {
        statusCode: 200,
        body: JSON.stringify({
          user: Item
        })
      };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "get User fails",
        err
      })
    };
  }
};

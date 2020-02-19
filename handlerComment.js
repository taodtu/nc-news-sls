"use strict";
//handlers for Comment query
const getComments = require("./model/getComments");

module.exports.getComments = async event => {
  const { query } = event.queryStringParameters;
  try {
    const Items = await getComments(query);
    return {
      statusCode: 200,
      body: JSON.stringify({
        Comments: Items
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "get Comments fails",
        err
      })
    };
  }
};

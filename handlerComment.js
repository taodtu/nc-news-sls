"use strict";
//handlers for Comment query
const getComments = require("./model/getComments");

module.exports.sendComments = async event => {
  try {
    const { username, article_id } = event.pathParameters;
    const { Items } = await getComments({ username, article_id });
    if (!Items[0])
      return {
        statusCode: 404,
        body: JSON.stringify({
          Message: "not found"
        })
      };
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

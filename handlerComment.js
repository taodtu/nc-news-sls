"use strict";
//handlers for Comment query
const getComments = require("./model/getComments");

module.exports.getComments = async event => {
  const { author, article_id } = event.queryStringParameters;
  if (!author && !article_id)
    return {
      statusCode: 400,
      body: JSON.stringify({
        Message: "bad request"
      })
    };
  try {
    const { Items } = await getComments({ author, article_id });
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

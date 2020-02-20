"use strict";
//handlers for article query
const { getAllArticles, getArticlesBy } = require("./model/getArticles");

module.exports.getArticles = async event => {
  if (!event.queryStringParameters)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "bad request"
      })
    };

  const { sort_by, author, topic, order } = event.queryStringParameters;
  if (!author && !topic)
    try {
      const { Items } = await getAllArticles({ sort_by, order });
      return {
        statusCode: 200,
        body: JSON.stringify({
          articles: Items
        })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "get Articles fails",
          err
        })
      };
    }
  else
    try {
      const { Items } = await getArticlesBy({ sort_by, author, topic, order });
      return {
        statusCode: 200,
        body: JSON.stringify({
          articles: Items
        })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "get Articles fails",
          err
        })
      };
    }
};

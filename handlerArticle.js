"use strict";
//handlers for article query
const { getAllArticles, getArticlesBy } = require("./model/getArticles");

module.exports.getArticles = async event => {
  if (!event.queryStringParameters)
    try {
      const { Items } = await getAllArticles();
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
  const { order_by, author, topic } = event.queryStringParameters;
  try {
    const { Items } = await getArticlesBy({ order_by, author, topic });
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

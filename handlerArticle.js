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
  const { sort_by, author, topic, order } = event.queryStringParameters;
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

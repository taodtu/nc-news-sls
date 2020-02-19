"use strict";
//handlers for article query
const getArticlesByTopic = require("./model/getArticlesByTopic");
const getArticlesByAuthor = require("./model/getArticlesByAuthor");

module.exports.getArticles = async event => {
  const { topic, author } = event.queryStringParameters;
  try {
    if (author) {
      const Items = await getArticlesByAuthor({ author });
      return {
        statusCode: 200,
        body: JSON.stringify({
          articles: Items
        })
      };
    }
    if (topic) {
      const Items = await getArticlesByTopic({ topic });
      return {
        statusCode: 200,
        body: JSON.stringify({
          articles: Items
        })
      };
    }
    const Items = await getArticles({});
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

"use strict";
//handlers for article query
const {
  getAllArticles,
  getArticlesBy,
  getArticleByID,
  updateArticleByID
} = require("./model/articles");

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
      const result = await getAllArticles({ sort_by, order });
      return {
        statusCode: 200,
        body: JSON.stringify({
          articles: result
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
      const result = await getArticlesBy({ sort_by, author, topic, order });
      return {
        statusCode: 200,
        body: JSON.stringify({
          articles: result
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

module.exports.getArticleByID = async event => {
  if (!event.pathParameters)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "bad request"
      })
    };

  const { article_id } = event.pathParameters;

  try {
    const { Items } = await getArticleByID(article_id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        article: Items[0]
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "get Article fails",
        err
      })
    };
  }
};

module.exports.patchArticle = async event => {
  if (!(event.pathParameters && event.body))
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "bad request"
      })
    };

  const { article_id } = event.pathParameters;
  const { inc_votes, created_at } = JSON.parse(event.body);

  try {
    const Items = await updateArticleByID(article_id, inc_votes, created_at);
    return {
      statusCode: 200,
      body: JSON.stringify({
        article: Items
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "update Article fails",
        err
      })
    };
  }
};

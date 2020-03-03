"use strict";
//handlers for Comment query
const { getComments, updateComment } = require("./model/comments");

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

module.exports.patchComment = async event => {
  if (!(event.pathParameters && event.body))
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "bad request"
      })
    };

  const { comment_id } = event.pathParameters;
  const { inc_votes } = JSON.parse(event.body);

  try {
    const Items = await updateComment(comment_id, inc_votes);
    return {
      statusCode: 200,
      body: JSON.stringify({
        comment: Items
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

module.exports.postComment = async event => {
  const { article_id } = event.pathParameters;
  //const { inc_votes } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      comment: article_id
    })
  };
};

module.exports.deleteComment = async event => {
  const { comment_id } = event.pathParameters;
  //const { inc_votes } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      comment: comment_id
    })
  };
};

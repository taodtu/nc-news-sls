"use strict";
//handlers for topic and user table query
const getTopics = require("./model/getTopics");
const getUser = require("./model/getUser");

module.exports.getTopics = async event => {
  try {
    const { Items } = await getTopics();
    const res = Items.map(topic => {
      const { slug, sk } = topic;
      return { slug, description: sk };
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        topics: res
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
    const { Items } = await getUser(username);
    if (!Items[0])
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "user not found"
        })
      };
    else {
      const { sk, avatar_url, name } = Items[0];
      return {
        statusCode: 200,
        body: JSON.stringify({
          user: { avatar_url, name, username: sk }
        })
      };
    }
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

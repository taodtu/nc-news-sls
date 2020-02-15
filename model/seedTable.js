const { dbClincet } = require("../config");
const {
  topicData,
  userData,
  commentData,
  articleData
} = require("../data/index");

module.exports = async () => {
  const topicSeed = topicData.map(({ slug, description }) =>
    dbClincet
      .put({
        TableName: "topicsTable",
        Item: { slug, description }
      })
      .promise()
  );
  const userSeed = userData.map(({ username, name, avatar_url }) =>
    dbClincet
      .put({
        TableName: "usersTable",
        Item: { username, name, avatar_url }
      })
      .promise()
  );
  console.log(commentData);
  const commentSeed = commentData.map(
    ({ author, article, created_at, votes, body }) =>
      dbClincet
        .put({
          TableName: "commentsTable",
          Item: { author, article, created_at, votes, body }
        })
        .promise()
  );
  return Promise.all([...topicSeed, ...userSeed, ...commentSeed]);
};

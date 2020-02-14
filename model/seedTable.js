const { dbClincet } = require("../config");
const { topicData, userData } = require("../data/index");

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
  return Promise.all([...topicSeed, ...userSeed]);
};

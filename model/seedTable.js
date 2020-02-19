const { db } = require("../config");
const {
  topicData,
  userData,
  commentData,
  articleData
} = require("../data/index");

module.exports = async () => {
  //change the batchWriteItem method into promise based
  const seedTablePromise = params =>
    new Promise((resolve, reject) => {
      db.batchWriteItem(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

  const paramsTopicAndUser = {
    RequestItems: {
      NcNewsTable: [
        ...topicData.map(topic => ({
          PutRequest: {
            Item: {
              pk: { S: "Topic" },
              sk: { S: topic.description },
              slug: { S: topic.slug }
            }
          }
        })),
        ...userData.map(user => ({
          PutRequest: {
            Item: {
              pk: { S: "User" },
              sk: { S: user.name },
              username: { S: user.username },
              avatar_url: { S: user.avatar_url }
            }
          }
        }))
      ]
    },
    ReturnConsumedCapacity: "TOTAL"
  };

  await seedTablePromise(paramsTopicAndUser);

  /*const topicSeed = topicData.map(({ slug, description }) =>
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
  const commentSeed = commentData.map(
    ({ author, article, created_at, votes, body }) =>
      dbClincet
        .put({
          TableName: "commentsTable",
          Item: { author, article, created_at, votes, body }
        })
        .promise()
  );
  await Promise.all([...topicSeed, ...userSeed, ...commentSeed]);
  const articleDataWithCommentCount = await Promise.all(
    articleData.map(async article => {
      const res = await dbClincet
        .query({
          TableName: "commentsTable",
          KeyConditionExpression: "article = :hkey",
          ExpressionAttributeValues: {
            ":hkey": article.title
          }
        })
        .promise();
      return { ...article, comments_count: res.Count };
    })
  );
  await Promise.all(
    articleDataWithCommentCount.map(
      ({ author, title, topic, created_at, body, comments_count }) =>
        dbClincet
          .put({
            TableName: "articlesTable",
            Item: {
              author,
              title,
              topic,
              created_at,
              body,
              comments_count,
              votes: 0
            }
          })
          .promise()
    )
  );*/
};

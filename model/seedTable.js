const { dbClincet } = require("../config");
const {
  topicData,
  userData,
  commentData,
  articleData
} = require("../data/index");

const format = (arr1, arr2, name, id, keyToChange) => {
  const lookUp = arr1.reduce((acc, cur) => {
    acc[cur[name]] = cur[id];
    return acc;
  }, {});
  return arr2.map(e => {
    const { [keyToChange]: keyToChanges, ...rest } = e;
    return { ...rest, [id]: lookUp[e[keyToChange]] };
  });
};

module.exports = async () => {
  const formattedCommentData = format(
    articleData,
    commentData,
    "title",
    "article_id",
    "belongs_to"
  );

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

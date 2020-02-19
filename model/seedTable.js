const { db } = require("../config");
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
  //change the batchWriteItem method into promise based
  const seedTablePromise = params =>
    new Promise((resolve, reject) => {
      db.batchWriteItem(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

  const paramsTopic = {
    RequestItems: {
      NcNewsTable: [
        {
          PutRequest: {
            Item: {
              pk: {
                S: "Amazon DynamoDB"
              },
              sk: {
                S: "Amazon Web Services"
              }
            }
          }
        }
      ]
    },
    ReturnConsumedCapacity: "TOTAL"
  };

  return seedTablePromise(paramsTopic);

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

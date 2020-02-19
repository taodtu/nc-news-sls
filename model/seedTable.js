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

  // batchWriteItem can wirte max 25 request so this array is divided
  const articleInput = articleData.reduce(
    (a, article, index) => {
      const { topic, author, votes, created_at, ...rest } = article;
      const item1 = {
        ...rest,
        sk: "topicDate",
        data: `${topic}#${created_at}`,
        topic,
        author,
        votes,
        created_at
      };
      const item2 = {
        ...rest,
        sk: "topicVote",
        data: `${topic}#${votes}`,
        topic,
        author,
        votes,
        created_at
      };
      const item3 = {
        ...rest,
        sk: "topicAuthor",
        data: `${topic}#${author}`,
        topic,
        author,
        votes,
        created_at
      };
      const item4 = {
        ...rest,
        sk: "author",
        data: author,
        topic,
        author,
        votes,
        created_at
      };
      a[Math.floor(((index + 1) * 4) / 22)].push(item1, item2, item3, item4);
      return a;
    },
    [...Array(Math.ceil((articleData.length * 4) / 22))].map(e => [])
  );
  //seed article data
  for (let i = 0; i < articleInput.length; i++) {
    const params = {
      RequestItems: {
        NcNewsTable: [
          ...articleInput[i].map(article => ({
            PutRequest: {
              Item: {
                pk: { S: `article#${article.article_id}` },
                sk: { S: article.sk },
                data: { S: article.data },
                topic: { S: article.topic },
                author: { S: article.author },
                votes: { S: `${article.votes}` },
                created_at: { S: article.created_at },
                title: { S: article.title },
                body: { S: article.body }
              }
            }
          }))
        ]
      },
      ReturnConsumedCapacity: "TOTAL"
    };
    await seedTablePromise(params);
  }
  // batchWriteItem can wirte max 25 request so this array is divided
  const commentInput = commentData.reduce(
    (a, comment, index) => {
      const { author, article_id, ...rest } = comment;
      const item1 = {
        ...rest,
        sk: author,
        data: comment.created_at,
        article_id,
        author
      };
      const item2 = {
        ...rest,
        sk: article_id,
        data: comment.created_at,
        author,
        article_id
      };
      a[Math.floor((index + 1) / 11)].push(item1, item2);
      return a;
    },
    [...Array(Math.ceil(commentData.length / 11))].map(e => [])
  );
  //seed comment data
  for (let i = 0; i < commentInput.length; i++) {
    const params = {
      RequestItems: {
        NcNewsTable: [
          ...commentInput[i].map(comment => ({
            PutRequest: {
              Item: {
                pk: { S: `comment#${comment.created_at}` },
                sk: { S: comment.sk },
                data: { S: comment.data },
                votes: { S: `${comment.votes}` },
                body: { S: comment.body },
                article_id: { S: comment.article_id },
                author: { S: comment.author }
              }
            }
          }))
        ]
      },
      ReturnConsumedCapacity: "TOTAL"
    };
    await seedTablePromise(params);
  }
};

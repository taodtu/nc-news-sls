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
  /*
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
              sk: { S: user.username },
              name: { S: user.name },
              avatar_url: { S: user.avatar_url }
            }
          }
        }))
      ]
    },
    ReturnConsumedCapacity: "TOTAL"
  };

  await seedTablePromise(paramsTopicAndUser);*/
  // batchWriteItem can wirte max 25 request so this array is divided
  const articleInput = articleData.reduce(
    (a, article, index) => {
      a[Math.floor((index + 1) / 22)].push(article);
      return a;
    },
    [...Array(Math.ceil(articleData.length / 22))].map(e => [])
  );
  //seed article data
  for (let i = 0; i < articleInput.length; i++) {
    const params = {
      RequestItems: {
        NcNewsTable: [
          ...articleInput[i].map(article => ({
            PutRequest: {
              Item: {
                pk: { S: article.article_id },
                sk: { S: article.created_at },
                topic: { S: article.topic },
                author: { S: article.author },
                votes: { S: `${article.votes}` },
                created_at: { S: article.created_at },
                title: { S: article.title },
                body: { S: article.body },
                gsi_1pk: { S: "articleVote" },
                gsi_1sk: { S: `${article.votes}` },
                gsi_2pk: { S: "articlesAuthorDate" },
                gsi_2sk: { S: `${article.author}#${article.created_at}` },
                gsi_3pk: { S: "articlesTopicDate" },
                gsi_3sk: { S: `${article.topic}#${article.created_at}` },
                gsi_4pk: { S: "articlesTopicVote" },
                gsi_4sk: { S: `${article.topic}#${article.votes}` }
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
  /* const commentInput = commentData.reduce(
    (a, comment, index) => {
      a[Math.floor((index + 1) / 22)].push(comment);
      return a;
    },
    [...Array(Math.ceil(commentData.length / 22))].map(e => [])
  );
  //seed comment data
  for (let i = 0; i < commentInput.length; i++) {
    const params = {
      RequestItems: {
        NcNewsTable: [
          ...commentInput[i].map(comment => ({
            PutRequest: {
              Item: {
                pk: { S: `comment` },
                sk: { S: comment.created_at },
                gsi_1pk: { S: "commentsAuthor" },
                gsi_1sk: { S: `${comment.author}#${comment.created_at}` },
                gsi_2pk: { S: "commentsArticle" },
                gsi_2sk: { S: `${comment.article_id}#${comment.created_at}` },
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
  }*/
};

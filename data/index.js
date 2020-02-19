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

const comment = require("./comments");
const article = require("./articles");

const articleData = article.map((article, index) => {
  const { created_at, ...rest } = article;
  return {
    ...rest,
    created_at: new Date(article["created_at"]).toISOString(),
    article_id: `article_id${index}`,
    votes: Math.floor(Math.random() * Math.floor(20))
  };
});

exports.commentData = format(
  articleData,
  comment.map(comment => {
    const { created_at, created_by, ...rest } = comment;
    return {
      ...rest,
      author: created_by,
      created_at: new Date(comment["created_at"]).toISOString()
    };
  }),
  "title",
  "article_id",
  "belongs_to"
);
exports.articleData = articleData;
exports.topicData = require("./topics");
exports.userData = require("./users");

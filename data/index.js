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

const comment = require("./comments").map(comment => {
  const { created_at, created_by, ...rest } = comment;
  return {
    ...rest,
    author: created_by,
    created_at: new Date(comment["created_at"]).toISOString()
  };
});
exports.articleData = require("./articles").map((article, index) => {
  const { created_at, ...rest } = article;
  return {
    ...rest,
    created_at: new Date(article["created_at"]).toISOString(),
    article_id: index
  };
});
exports.commentData = format(
  articleData,
  comment,
  "title",
  "article_id",
  "belongs_to"
);
exports.topicData = require("./topics");
exports.userData = require("./users");

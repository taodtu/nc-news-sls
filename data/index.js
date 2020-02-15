exports.commentData = require("./comments").map(comment => {
  const { created_at, created_by, belongs_to, ...rest } = comment;
  return {
    ...rest,
    author: created_by,
    article: belongs_to,
    created_at: new Date(comment["created_at"]).toISOString()
  };
});
exports.articleData = require("./articles").map(article => {
  const { created_at, ...rest } = article;
  return { ...rest, created_at: new Date(article["created_at"]).toISOString() };
});
exports.topicData = require("./topics");
exports.userData = require("./users");

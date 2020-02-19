exports.commentData = require("./comments").map(comment => {
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
exports.topicData = require("./topics");
exports.userData = require("./users");

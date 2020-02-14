exports.commentData = require('./comments').map(comment => {
 const { created_at, ...rest } = comment
 return { ...rest, created_at: new Date(comment['created_at']) }
});;
exports.articleData = require('./articles').map(article => {
 const { created_at, ...rest } = article
 return { ...rest, created_at: new Date(article['created_at']) }
});
exports.topicData = require('./topics');
exports.userData = require('./users');

const { dbClincet } = require("../config");
const { topicData, userData } = require("../data/index");

module.exports = async () =>
  Promise.all(
    topicData.map(topic =>
      dbClincet
        .put({
          TableName: "topicsTable",
          Item: { slug: topic.slug, description: topic.description }
        })
        .promise()
    )
  );

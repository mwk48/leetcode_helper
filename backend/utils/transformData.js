const toQuestion = (obj) => {
    return {
        id: obj["frontendQuestionId"],
        tags: obj["topicTags"].map(t => t["name"]),
        difficulty: obj["difficulty"],
        acceptance: obj["acRate"], 
        title: obj["title"],
        paid: obj["paidOnly"]
    };
};

export default toQuestion;
import mongoose from "mongoose";
import helper from "./fetchData.js";
import Question from "./models/question.js";
import config from "./utils/config.js";
import toQuestion from "./utils/transformData.js";
import Tag from "./models/tag.js";

(async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("connected to MongoDB");
    } catch (err) {
        console.log("error: " + err.message);
    }
})();

const insert = async () => {
    const skip = await Question.countDocuments({}).exec();
    const result = await helper(1, skip);
    const questions = result["data"]["problemsetQuestionList"]["questions"];
    console.log(result, skip, questions.length);
    if (questions.length===0) {
        return false;
    }
    let count=0;
    for (let question of questions) {
        count+=1;
        const Q = new Question(toQuestion(question));
        await Tag.findOneAndUpdate({}, {$addToSet: {tags: {$each: Q.tags}}}, {upsert: true});
        await Q.save();
        if (count%100===0) {
            console.log(count);
        }
    }
    return count>0;
};

(async () => {
    //await Question.deleteMany({});
    //await Tag.deleteMany({});
    //await Question.counterReset("questionId", () => {});
    for (;;) {
        const count =await insert();
        console.log(count);
        if (!count) {
            mongoose.disconnect();
            break;
        }
    }
})();




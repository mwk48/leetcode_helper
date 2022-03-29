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
    const questions = await Question.find({});
    let count=0;
    for (let question of questions) {
        await Tag.findOneAndUpdate({}, {$addToSet: {tags: {$each: question.tags}}}, {upsert: true});
        if (count++%100===0) {
            console.log(count);
        }
    }
    return false;
};

(async () => {
    for (;;) {
        const count =await insert();
        if (!count) {
            console.log("disconnected");
            mongoose.disconnect();
            break;
        }
    }
})();
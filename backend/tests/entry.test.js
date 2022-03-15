import helper from "../fetchData.js";
import config from "../utils/config.js";
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import Question from "../models/question.js";
import Last from "../models/last.js";
const api = supertest(app);
const toQuestion = (obj) => {
    return {
        id: obj["frontendQuestionId"],
        tags: obj["topicTags"].map(t => t["name"]),
        difficulty: obj["difficulty"],
        acceptance: obj["acRate"], 
        title: obj["title"],
        paid: obj["paidOnly"]
    }
}

beforeEach( async () => {
    await Question.deleteMany({});
    await Last.deleteMany({});
    const result = await helper(10, 0);
    const questions = result["data"]["problemsetQuestionList"]["questions"]
    for (let question of questions) {
        const Q = new Question(toQuestion(question));
        await Q.save();
    }
}, 30000);
test("load links correctly", async () => {
    const questions = await Question.countDocuments({}).exec();
    expect(questions).toBe(10);
});

afterAll(async () => {
    await mongoose.connection.close();
}); 

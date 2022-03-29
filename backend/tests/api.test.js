import helper from "../fetchData.js";
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import Question from "../models/question.js";
import Last from "../models/last.js";
import toQuestion from "../utils/transformData.js";
import Tag from "../models/tag.js";

const api = supertest(app);

beforeEach( async () => {
    await Question.deleteMany({});
    await Last.deleteMany({});
    await Tag.deleteMany({});
    await Question.counterReset("questionId", () => {});
    const result = await helper(10, 0);
    const questions = result["data"]["problemsetQuestionList"]["questions"];
    for (let question of questions) {
        const Q = new Question(toQuestion(question));
        await Tag.findOneAndUpdate({}, {$addToSet: {tags: {$each: Q.tags}}}, {upsert: true});
        await Q.save();
    }
    const number = await Question.countDocuments({}).exec();
    const L = new Last({last: number});
    await L.save();
    
}, 30000);

test("everything is returned as json", async () => {
    await api
        .get("/api/questions")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    await api
        .get("/api/questions/count")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    await api
        .get("/api/questions/qid/1")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});
 
test("query string", async () => {
    const questions = await api.get("/api/questions?tags=Recursion&difficulty=Hard&acceptance=20&page=1&limit=100&paid=false");
    const body = questions.body;
    expect(1).toBe(1);
});

test("Tag test", async () => {
    const tagResult = await Tag.findOne({});
    const number = await Tag.countDocuments({}).exec();
    expect(number).toBe(1);
    console.log(tagResult.tags);
    expect(tagResult.tags.length>0).toBeTruthy();
});

afterAll(async () => {
    await mongoose.connection.close();
}); 

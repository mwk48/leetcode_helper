import helper from "../fetchData.js";
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import Question from "../models/question.js";
import Last from "../models/last.js";
import toQuestion from "../utils/transformData.js";
import Tag from "../models/tag.js";

const api = supertest(app);

beforeAll( async () => {
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

test("insert correct number of data", async () => {
    const questions = await Question.countDocuments({}).exec();
    expect(questions).toBe(10);
    const last = await Last.countDocuments({}).exec();
    expect(last).toBe(1);
});

test("last number equals to number of questions", async () => {
    const last = await Last.findOne({});
    const questions = await Question.countDocuments({}).exec();
    expect(last.last).toBe(questions);
});

test("expect correct data entry for first leetcode question", async () => {
    const firstQ = await Question.findOne({});
    expect(firstQ["title"]).toBe("Two Sum");
    expect(firstQ["difficulty"]).toBe("Easy");
    expect(firstQ["paid"]).not.toBeTruthy();
    expect(firstQ["tags"]).toContain("Array");
    expect(firstQ["tags"]).toContain("Hash Table");
    expect(firstQ["url"]).toBe("https://leetcode.com/problems/two-sum");
});

test("skiping data correctly", async () => {
    const query = await helper(5, 10);
    const questions = query["data"]["problemsetQuestionList"]["questions"];
    expect(questions).toHaveLength(5);
    expect(questions[0]["frontendQuestionId"]).toBe("11");
});

test("questionId generated correctly", async () => {
    const number = await Question.countDocuments({}).exec();
    const questions = await Question.find({});
    const ids = questions.map(q => q["questionId"]);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
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

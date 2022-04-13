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
    await api
        .get("/api/questions/ids")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    await api
        .get("/api/tags")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});
 
test("query string", async () => {
    const questions = await api.get("/api/questions?tags=Recursion&difficulty=Hard&acceptance=20&page=1&limit=100&paid=false");
    const body = questions.body;
    const docs = body.docs;
    expect(docs).toHaveLength(1);
    expect(docs[0]["questionId"]).toBe(10);
});

test("query string, params", async () => {
    const questions = await api.get("/api/questions").query({tags: ["Recursion"]});
    const body = questions.body;
    const docs = body.docs;
    expect(docs).toHaveLength(2);
    expect(docs[0]["questionId"]).toBe(2);
    expect(docs[1]["questionId"]).toBe(10);
});

test("acceptance query test", async () => {
    const questions = await api.get("/api/questions").query({ acceptance: 80 });
    const body = questions.body;
    const docs = body.docs;
    expect(docs).toHaveLength(0);
});

test("difficulty query test", async () => {
    const questions = await api.get("/api/questions").query({ difficulty: "Easy" });
    const body = questions.body;
    const docs = body.docs;
    expect(docs).toHaveLength(2);
    expect(docs[0]["questionId"]).toBe(1);
    expect(docs[1]["questionId"]).toBe(9);
});

test("Tag test", async () => {
    const tagResult = await Tag.findOne({});
    const number = await Tag.countDocuments({}).exec();
    expect(number).toBe(1);
    console.log(tagResult.tags);
    expect(tagResult.tags.length>0).toBeTruthy();
});

test("question ids test", async () => {
    const ids = await api.get("/api/questions/ids");
    const body = ids.body;
    const result = body.map(i => i["questionId"]);
    expect(result).toEqual([...Array(10).keys()].map(i => i+1));
});

test("count test", async () => {
    const ids = await api.get("/api/questions/count");
    const body = ids.body;
    expect(body).toEqual({count: 10});
});

test("find question by id test", async () => {
    const question = await api.get("/api/questions/qid/1");
    const body = question.body;
    expect(body["questionId"]).toBe(1);
    expect(body["title"]).toBe("Two Sum");
    const fail = await api.get("/api/questions/qid/1000").expect(404);
    //console.log(fail.error.text);
    const errorMessage = JSON.parse(fail.error.text);
    expect(errorMessage).toEqual({"error": "Invalid question id"});
});

afterAll(async () => {
    await mongoose.connection.close();
}); 

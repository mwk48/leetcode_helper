import express from "express";
import mongoose from "mongoose";
import Question from "../models/question.js"

const questionRouter = express.Router();

questionRouter.get("/qid/:id", async (req, res) => {
    const number = Number(req.params.id);
    const course= await Question.findOne({"questionId": number});
    if (course) {
        res.json(course);
    } else {
        res.status(404).end();
    }
});

questionRouter.get("/dbid/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "malformatted id" });
    }
    const course= await Question.findById(req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).end();
    }
});

questionRouter.get("/", async (req, res) => {
    const courses= await Question.find({});
    res.json(courses);
});



export default questionRouter;
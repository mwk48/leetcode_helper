import express from "express";
import mongoose from "mongoose";
import Question from "../models/question.js"
import parse from "../utils/parseQuery.js";

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

questionRouter.get("/count", async (req, res) => {
    const result = await Question.countDocuments({}).exec();
    res.json({count: result});
});

questionRouter.get("/", async (req, res) => {
    let {option, query} = parse(req.query);
    console.log(option, query);
    /*
    query = {
        "tags" : { $all : ["Math", "Recursion"]},
        "difficulty" : "Hard",
        "acceptance": { $gt : 50},
        "paid": !true
    };
    */
    const result = await Question.paginate(query, option);
    console.log(result);
    res.json(result);
    
});



export default questionRouter;
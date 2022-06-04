import express from "express";
import mongoose from "mongoose";
import Question from "../models/question.js";
import parse from "../utils/parseQuery.js";

const questionRouter = express.Router();


questionRouter.get("/qid/:id", async (req, res) => {
    if (Number.isNaN(Number(req.params.id))) {
        return res.status(400).json({ error: "Invalid question id" });
    }
    const number = Number(req.params.id);
    const course= await Question.findOne({"questionId": number});
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ error: "Invalid question id" });
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
        res.status(404).json({ error: "Invalid id" });
    }
});

questionRouter.delete("/qid/:id", async (req, res) => {
    const id = Number(req.params.id);
    const result = await Question.findOne({"questionId": id});
    if (result) {
        await Question.deleteOne({"questionId": id});
        //console.log(result);
        res.status(200).json({ message: "Question deleted" });
    } else {
        res.status(404).json({ error: "Invalid question id" });
    }
});

questionRouter.get("/count", async (req, res) => {
    const result = await Question.countDocuments({}).exec();
    res.json({count: result});
});

questionRouter.get("/ids", async (req, res) => {
    let {option, query} = parse(req.query);
    console.log(option, query);
    const result = await Question.find(query, {questionId: 1, _id:0});
    res.json(result);
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
    //console.log(result);
    res.json(result);
    
});



export default questionRouter;
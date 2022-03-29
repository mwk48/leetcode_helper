import express from "express";
import Tag from "../models/tag.js";

const tagRouter = express.Router();

tagRouter.get("/", async (req, res) => {
    const result = await Tag.findOne({});
    res.json(result);
});

export default tagRouter;

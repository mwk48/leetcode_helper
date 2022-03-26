import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tags: [
        {
            type: String
        }
    ]
});

tagSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const tag = mongoose.model("Tag", tagSchema);

export default tag;
import mongoose from "mongoose";

const lastSchema = new mongoose.Schema({
    last : Number
});

lastSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const last = mongoose.model("Last", lastSchema);

export default last;
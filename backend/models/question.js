import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import sequence from "mongoose-sequence"

const AutoIncrement = sequence(mongoose);

const questionSchema = new mongoose.Schema({
    id: {
        unique: true,
        type: String
    },
    tags: [{
        type: String
    }],
    difficulty: String,
    acceptance: Number, 
    title: String,
    paid: Boolean
});

questionSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

questionSchema.plugin(AutoIncrement, {inc_field: 'questionId'});
questionSchema.plugin(mongooseUniqueValidator);

const question = mongoose.model("Question", questionSchema);

export default question;
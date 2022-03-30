import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import sequence from "mongoose-sequence";
import mongoosePaginate from "mongoose-paginate-v2";

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
    paid: Boolean,
    url: String
});

questionSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
        }
        delete returnedObject.__v;
    }
});

questionSchema.plugin(AutoIncrement, {inc_field: "questionId"});
questionSchema.plugin(mongooseUniqueValidator);
questionSchema.plugin(mongoosePaginate);

const question = mongoose.model("Question", questionSchema);
question.paginate().then({});
export default question;
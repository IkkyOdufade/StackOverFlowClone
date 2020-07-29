const mongoose = require('mongoose');
const schema = mongoose.Schema;

const answerSchema = new schema(
    {
        answers:{
            answer:{
                type: String,
                required:true,
            },
            user:{
                type: String,
                required: true
            },
            questionId: {
                type: String,
                required: true

            }
            },
        timestamps: Date
    }
);

const newAnswer = mongoose.model('answers', answerSchema);
module.exports = newAnswer;

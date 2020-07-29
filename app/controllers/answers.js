const answerSchema = require('../models/answers.model');
const question = require('../models/question.model');

const AddAnswer = async (req, res) => {
const answer = req.body;
try {
   const newAnswer = new answerSchema(answer);
   ///check if questions exist
   const questions =await question.findById( answer.answers.questionId )
    if (!questions) {
        ///question doesnt exist
        return res.status(403).json({
            error:true,
            msg:'Wrong question'
        })
    }
   newAnswer.save()
       return res.json({
           status:true,
           msg:'Saved answer.'
       })
}
catch (e) {
    console.log(e)///for debugging
    return res.status(403).json({
        error:true
    })
}
}

module.exports = {
    AddAnswer
};
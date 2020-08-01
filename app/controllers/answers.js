const answerSchema = require('../models/answers.model');
const question = require('../models/question.model');
const answer = require('../models/answers.model');

const AddAnswer = async (req, res) => {
const answer = req.body;
try {
   const newAnswer = new answerSchema(answer);
   ///check if questions exist
   const questionID =await question.find( answer.questionId )
    if (!questionID) {
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
const AllAnswers = async(req, res) =>{
    try{
        const data = await answer.find().populate('allAnswers');
        console.log("Getting questions")
        res.send(data);
        client.setex("/getall", 3600, JSON.stringify(data));

    }
    catch (e) {
        res.status(500)
        console.log(e, "Couldn't  get all questions")
    }

};
//function for caching all the questions from the database
const cache = (req, res, next) => {
    client.get("/getall", (err, data)=> {
        if (err) {
            return err;
        } else if (data !== null) {
            res.send(data);

        } else {
            next();
        }
    })
};


module.exports = {
    AddAnswer
};
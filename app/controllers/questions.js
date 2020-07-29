const questionSchema = require('../models/question.model');
const question = require('../models/question.model');
const redis = require('redis');
const client = redis.createClient(6379, 'redis')


//function for adding a new question
const addQuestion = async (req, res)=>{
    const question = req.body;
    const questId = req.body.questionId;
    console.log(questId);
    try {
        const newQuestion = new questionSchema(question);
    let newq=  await newQuestion.save();
    let newID = await newq._id;
        return res.json({
            status: true,
            msg: 'Saved question',
            newq
        });
    }
    catch (e) {
        console.log(e)///for debugging
        return res.status(403).json({
            error:true
        })
    }

};
//function for getting  all the questions on the database
const AllQuestions = async(req, res) =>{
    try{
        const data = await question.find().populate('allQuestions');
        console.log("Getting questions")
        res.send(data);
        client.setex("/all", 3600, JSON.stringify(data));

    }
    catch (e) {
        res.status(500)
        console.log(e, "Couldn't  get all questions")
    }

};
//function for caching all the questions from the database
const cache = (req, res, next) => {
        client.get("/all", (err, data)=> {
            if (err) {
                return err;
            } else if (data !== null) {
                res.send(data);

            } else {
                next();
            }
        })
};



const DeleteQuestion = async (req,res) => {
    const data = req.body
    try{
          await question.deleteOne( { _id: data.question }
          , function(err, obj) {
            if (err) return  res.status(401).json({error:true});
            else {
                res.json({msg:data.question + " document deleted"});
            }
        });

        // res.send(question_de, "err")
    }
   catch (e) {
       console.log(e, "mess")
       return  res.status(401).json({error:true});
   }
}

module.exports =  {
    addQuestion,
    AllQuestions,
    cache,
    DeleteQuestion
};
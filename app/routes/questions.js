const {addQuestion} = require('../controllers/questions');
const {AllQuestions, cache} = require('../controllers/questions');
const Qrouter  = require('express').Router();

//Make requests to the database to get all questions
Qrouter.route('/all').get(cache, AllQuestions)

//Making a post request to create a question
Qrouter.route('/create').post(addQuestion)

module.exports = {
    Qrouter
}
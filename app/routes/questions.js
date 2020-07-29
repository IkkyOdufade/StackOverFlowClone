const {addQuestion} = require('../controllers/questions');
const {AllQuestions, cache, DeleteQuestion} = require('../controllers/questions');
const Qrouter  = require('express').Router();

//Make requests to the database to get all questions
Qrouter.route('/all').get(cache, AllQuestions)

//Making a post request to create a question
Qrouter.route('/create').post(addQuestion)

//Making a post request to delete a question
Qrouter.route('/delete').get(DeleteQuestion)

module.exports = {
    Qrouter
}
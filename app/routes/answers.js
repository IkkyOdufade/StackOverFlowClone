const {AddAnswer} = require('../controllers/answers');
const Arouter  = require('express').Router();

//making a post request for adding answers to a question
Arouter.route('/add').post(AddAnswer)

module.exports = {
    Arouter
}
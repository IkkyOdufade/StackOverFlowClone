const {AddAnswer} = require('../controllers/answers');
const Arouter  = require('express').Router();

Arouter.route('/add').post(AddAnswer)

module.exports = {
    Arouter
}
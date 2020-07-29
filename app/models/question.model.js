const mongoose = require('mongoose');
const category = require('../models/categories.model');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
        questions: {
            question: {
                type: String,
                required:
                    true,
            }
            ,
            title: {
                type: String,
                required:
                    true,
            }
            ,
            categories: {
                type: Array,
                required:
                    true,
            }
            ,
            user: {
                type: String,
                required:
                    true,
            }

        },
        timestamps: Date
    }
)

questionSchema.pre('save', async function (next) {
    const question = this.questions;
    question.categories.map( async (name)=>{
        const cat = await category.findOne({name})
        console.log('cat',cat)
             if (!cat){
                 //save then
                 const nCat = new  category({name})
                 await  nCat.save()
             }
    })

    next()
})
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

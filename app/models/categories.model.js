const mongoose = require('mongoose');

const schema = mongoose.Schema;

const categorySchema = new schema({
    name:{
        type:String,
        required:true
    }
})
const newCategory = mongoose.model('category', categorySchema)

module.exports = newCategory;
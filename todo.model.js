const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema ({
    todo_title : {
        type : String
    },

    todo_description : {
        type : String
    },

    todo_targetdate : {
        type : String
    },

    todo_progress : {
        type : String
    },

    todo_complete: {
        type : String
    },


});

module.exports = mongoose.model('Todo' , Todo);
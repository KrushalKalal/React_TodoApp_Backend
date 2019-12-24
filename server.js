const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser : true});
    const connection = mongoose.connection;

    connection.once('open' , function() {
        console.log("MongoDB Database Connct Successfully.")
    })

 todoRoutes.route('/').get(function(req, res){
     Todo.find(function(err, todos){
          if(err) {
              console.log(err);
          }else {
              res.json(todos);
          }
     });
 });   

 todoRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Todo.findById(id, function(err, todo){
        res.json(todo);
    });
 });

todoRoutes.route('/add').post(function(req , res){
      let todo = new Todo(req.body);
      todo.save()
                 .then(todo => {
                     res.status(200).json({'todo' : "Todo added"})
                 })
                 .catch(err => {
                     res.status(400).send("Fail While adding a data");
                 });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_title = req.body.todo_title;
            todo.todo_description = req.body.todo_description;
            todo.todo_targetdate = req.body.todo_targetdate;
            todo.todo_progress = req.body.todo_progress;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});




 app.use('/todos' , todoRoutes);   

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
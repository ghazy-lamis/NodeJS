const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Todo = require("D:/GitHub Portfolio/Node Js P1/todo");

const app = express();

mongoose.connect('mongodb+srv://Lamis:123Lamis@cluster0.9v8owk9.mongodb.net/Todo_node', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection failed', err));

// Middleware for JSON parsing
app.use(express.json());
app.use(express.static('views'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about',(req, res)=> {
    res.sendFile(path.join(__dirname,'views','about.html'));
}
)
//Todo routes
app.get('/todo/create',(req, res)=> {
    res.sendFile(path.join(__dirname,'views','create.html'));
});

app.get('/todos', (req, res) => {
    Todo.find()
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json({ error: err.message }));
  });

app.post('/todos', (req, res) => {
  const todo = new Todo(req.body);
  todo.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});



// Start the server on port 1111
app.listen(1111, () => console.log('Server running on port 1111'));
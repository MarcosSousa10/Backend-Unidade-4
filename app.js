const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')


const ToDoSchema = require('./schemas/ToDoSchema');

const server = express();

server.use(cors())

server.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.loqo92a.mongodb.net/?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

server.get('/', (req, res) => {
  return res.json({ message: 'Seja bem vindo à API do TODO_LIST' });
})

server.post('/todo', async (req, res) => {
  const { title, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ message: 'Validations Fails' })
  }
  const todo = await ToDoSchema.create(req.body)
  return res.status(201).json(todo);
});

server.get('/todo', async (req, res) => {
  const todos = await ToDoSchema.find();
  return res.json(todos);
});

server.get('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await ToDoSchema.findById(id);
  return res.json(todo);
});

server.put('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await ToDoSchema.findOneAndUpdate({ '_id': id }, req.body);
  return res.json(todo);
})

server.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await ToDoSchema.deleteOne({ '_id': id });
  return res.json({ message: 'Successfully deleted' });
})


server.listen(3333, () => console.log('Servidor iniciado em http://localhost:3333'))
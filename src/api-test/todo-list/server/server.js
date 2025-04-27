const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const TODOS_FILE = path.join(__dirname, 'todos.json');

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 读取 todos.json 文件里的数据
let todos = [];
let idCounter = 1;

// 初始化，读取本地文件
function loadTodos() {
  if (fs.existsSync(TODOS_FILE)) {
    const data = fs.readFileSync(TODOS_FILE, 'utf-8');
    try {
      todos = JSON.parse(data);
      if (todos.length > 0) {
        idCounter = Math.max(...todos.map(t => t.id)) + 1;
      }
    } catch (e) {
      console.error('Failed to parse todos.json:', e);
      todos = [];
    }
  }
}

// 保存 todos 到本地文件
function saveTodos() {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}

// 初次加载
loadTodos();

// 获取所有 todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// 添加一个新的 todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = { id: idCounter++, title, completed: false };
  todos.push(newTodo);
  saveTodos();  // 保存到文件
  res.status(201).json(newTodo);
});

// 更新一个 todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  saveTodos();  // 保存到文件
  res.json(todo);
});

// 删除一个 todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  saveTodos();  // 保存到文件
  res.status(204).send();
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`TodoList server running at http://localhost:${PORT}`);
});

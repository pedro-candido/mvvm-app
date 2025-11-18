const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Configurar CORS e middlewares
server.use(middlewares)
server.use(jsonServer.bodyParser)

// Middleware personalizado para adicionar delay (simular latência de rede)
server.use((req, res, next) => {
  setTimeout(next, 500) // 500ms de delay
})

// Middleware para log das requisições
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Rotas customizadas
server.get('/api/users/:id/posts', (req, res) => {
  const userId = parseInt(req.params.id)
  const db = router.db
  const userPosts = db.get('posts').filter({ userId }).value()
  res.json(userPosts)
})

server.get('/api/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id)
  const db = router.db
  const postComments = db.get('comments').filter({ postId }).value()
  res.json(postComments)
})

server.get('/api/products/category/:category', (req, res) => {
  const category = req.params.category
  const db = router.db
  const categoryProducts = db.get('products').filter({ category }).value()
  res.json(categoryProducts)
})

server.get('/api/search', (req, res) => {
  const query = req.query.q
  const db = router.db
  
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' })
  }
  
  const users = db.get('users').filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  ).value()
  
  const posts = db.get('posts').filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase())
  ).value()
  
  const products = db.get('products').filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  ).value()
  
  res.json({ users, posts, products })
})

// Middleware para autenticação simulada
server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }
  
  const db = router.db
  const user = db.get('users').find({ email }).value()
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  
  // Simular autenticação bem-sucedida
  const token = 'fake-jwt-token-' + Date.now()
  res.json({ 
    token, 
    user: { 
      id: user.id, 
      name: user.name, 
      email: user.email,
      avatar: user.avatar 
    } 
  })
})

server.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' })
  }
  
  const db = router.db
  const existingUser = db.get('users').find({ email }).value()
  
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' })
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`,
    createdAt: new Date().toISOString()
  }
  
  db.get('users').push(newUser).write()
  
  const token = 'fake-jwt-token-' + Date.now()
  res.status(201).json({ 
    token, 
    user: { 
      id: newUser.id, 
      name: newUser.name, 
      email: newUser.email,
      avatar: newUser.avatar 
    } 
  })
})

// Usar as rotas padrão do json-server
server.use('/api', router)

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log('🚀 JSON Server is running!')
  console.log(`📡 Server: http://localhost:${port}`)
  console.log('📋 Available endpoints:')
  console.log('  GET    /api/users')
  console.log('  GET    /api/posts')
  console.log('  GET    /api/products')
  console.log('  GET    /api/categories')
  console.log('  GET    /api/comments')
  console.log('  GET    /api/users/:id/posts')
  console.log('  GET    /api/posts/:id/comments')
  console.log('  GET    /api/products/category/:category')
  console.log('  GET    /api/search?q=query')
  console.log('  POST   /api/auth/login')
  console.log('  POST   /api/auth/register')
  console.log('  🔗 Full API documentation: http://localhost:' + port)
})
# Backend Mock Server com JSON Server

Este projeto inclui um servidor backend mock usando JSON Server para facilitar o desenvolvimento do frontend.

## 🚀 Como usar

### Iniciar apenas o servidor

```bash
npm run server
```

### Iniciar o servidor com watch (reinicia automaticamente quando há mudanças)

```bash
npm run server:watch
```

### Iniciar o app e o servidor simultaneamente

```bash
npm run dev
```

## 📡 Endpoints Disponíveis

O servidor roda em `http://localhost:3001`

### Endpoints Básicos (CRUD)

- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Obtém um usuário específico
- `POST /api/users` - Cria um novo usuário
- `PUT /api/users/:id` - Atualiza um usuário
- `DELETE /api/users/:id` - Remove um usuário

- `GET /api/posts` - Lista todos os posts
- `GET /api/posts/:id` - Obtém um post específico
- `POST /api/posts` - Cria um novo post
- `PUT /api/posts/:id` - Atualiza um post
- `DELETE /api/posts/:id` - Remove um post

- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Obtém um produto específico
- `POST /api/products` - Cria um novo produto
- `PUT /api/products/:id` - Atualiza um produto
- `DELETE /api/products/:id` - Remove um produto

- `GET /api/categories` - Lista todas as categorias
- `GET /api/comments` - Lista todos os comentários

### Endpoints Personalizados

- `GET /api/users/:id/posts` - Posts de um usuário específico
- `GET /api/posts/:id/comments` - Comentários de um post específico
- `GET /api/products/category/:category` - Produtos por categoria
- `GET /api/search?q=termo` - Busca global (usuários, posts, produtos)

### Autenticação (Mock)

- `POST /api/auth/login` - Login (email e password)
- `POST /api/auth/register` - Registro (name, email e password)

## 📋 Exemplos de Uso

### Fazer login

```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "qualquer-senha"
}
```

### Criar um novo produto

```javascript
POST /api/products
Content-Type: application/json

{
  "name": "Novo Produto",
  "price": 99.99,
  "description": "Descrição do produto",
  "category": "smartphones",
  "inStock": true,
  "stock": 10
}
```

### Buscar produtos por categoria

```javascript
GET / api / products / category / smartphones;
```

### Fazer busca global

```javascript
GET /api/search?q=iPhone
```

## 🔧 Como usar no Frontend

### Importar e usar os hooks

```typescript
import { useUsers, usePosts, useProducts } from "../hooks/useApi";

function MeuComponente() {
  const { users, loading, error, createUser } = useUsers();

  const handleCreateUser = async () => {
    try {
      await createUser({
        name: "Novo Usuário",
        email: "novo@example.com",
      });
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Usar os serviços diretamente

```typescript
import { UserService, AuthService } from "../data/dataSources/api.service";

// Fazer login
const loginUser = async () => {
  try {
    const response = await AuthService.login("email@example.com", "password");
    console.log("Token:", response.token);
    console.log("User:", response.user);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Buscar usuário por ID
const getUser = async (id: number) => {
  try {
    const user = await UserService.getUserById(id);
    console.log("User:", user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
```

## 📊 Estrutura dos Dados

### User

```typescript
{
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}
```

### Post

```typescript
{
  id: number;
  title: string;
  content: string;
  userId: number;
  likes?: number;
  createdAt?: string;
  updatedAt?: string;
}
```

### Product

```typescript
{
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  inStock: boolean;
  stock: number;
}
```

## ⚙️ Configurações

- **Porta:** 3001 (pode ser alterada via variável de ambiente PORT)
- **Delay:** 500ms simulando latência de rede
- **CORS:** Habilitado para todas as origens
- **Logs:** Todas as requisições são logadas no console

## 🗂️ Arquivos Importantes

- `db.json` - Dados do servidor
- `server.js` - Configuração do servidor
- `src/data/dataSources/api.service.ts` - Serviços para chamadas API
- `src/presentation/hooks/useApi.ts` - Hooks React para gerenciamento de estado
- `json-server.json` - Configurações do JSON Server

## 📝 Notas

- O servidor simula latência de rede com delay de 500ms
- Todas as alterações são temporárias e resetadas ao reiniciar o servidor
- Para persistir dados, você pode modificar diretamente o arquivo `db.json`
- A autenticação é apenas simulada para fins de desenvolvimento

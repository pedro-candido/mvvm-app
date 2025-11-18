// Base configuration for API calls
const API_BASE_URL = "http://localhost:3001/api";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Network error" }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Generic API service class
export class ApiService {
  private static baseURL = API_BASE_URL;

  static async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    return handleResponse(response);
  }

  static async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }

  static async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }

  static async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  }
}

// User-specific API calls
export class UserService {
  static async getAllUsers() {
    return ApiService.get("/users");
  }

  static async getUserById(id: number) {
    return ApiService.get(`/users/${id}`);
  }

  static async getUserPosts(userId: number) {
    return ApiService.get(`/users/${userId}/posts`);
  }

  static async createUser(userData: any) {
    return ApiService.post("/users", userData);
  }

  static async updateUser(id: number, userData: any) {
    return ApiService.put(`/users/${id}`, userData);
  }

  static async deleteUser(id: number) {
    return ApiService.delete(`/users/${id}`);
  }
}

// Post-specific API calls
export class PostService {
  static async getAllPosts() {
    return ApiService.get("/posts");
  }

  static async getPostById(id: number) {
    return ApiService.get(`/posts/${id}`);
  }

  static async getPostComments(postId: number) {
    return ApiService.get(`/posts/${postId}/comments`);
  }

  static async createPost(postData: any) {
    return ApiService.post("/posts", postData);
  }

  static async updatePost(id: number, postData: any) {
    return ApiService.put(`/posts/${id}`, postData);
  }

  static async deletePost(id: number) {
    return ApiService.delete(`/posts/${id}`);
  }
}

// Product-specific API calls
export class ProductService {
  static async getAllProducts() {
    return ApiService.get("/products");
  }

  static async getProductById(id: number) {
    return ApiService.get(`/products/${id}`);
  }

  static async getProductsByCategory(category: string) {
    return ApiService.get(`/products/category/${category}`);
  }

  static async createProduct(productData: any) {
    return ApiService.post("/products", productData);
  }

  static async updateProduct(id: number, productData: any) {
    return ApiService.put(`/products/${id}`, productData);
  }

  static async deleteProduct(id: number) {
    return ApiService.delete(`/products/${id}`);
  }
}

// Authentication API calls
export class AuthService {
  static async login(email: string, password: string) {
    return ApiService.post("/auth/login", { email, password });
  }

  static async register(name: string, email: string, password: string) {
    return ApiService.post("/auth/register", { name, email, password });
  }
}

// Search API calls
export class SearchService {
  static async search(query: string) {
    return ApiService.get(`/search?q=${encodeURIComponent(query)}`);
  }
}

// Category API calls
export class CategoryService {
  static async getAllCategories() {
    return ApiService.get("/categories");
  }

  static async getCategoryById(id: number) {
    return ApiService.get(`/categories/${id}`);
  }
}

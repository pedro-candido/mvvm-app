import { useEffect, useState } from "react";
import {
  PostService,
  ProductService,
  UserService,
} from "../../data/dataSources/api.service";

// Types
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  likes?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  inStock: boolean;
  stock: number;
}

// Hook para gerenciar usuários
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = (await UserService.getAllUsers()) as User[];
      setUsers(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = (await UserService.createUser(userData)) as User;
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: number, userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = (await UserService.updateUser(id, userData)) as User;
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user))
      );
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await UserService.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

// Hook para gerenciar posts
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const postData = (await PostService.getAllPosts()) as Post[];
      setPosts(postData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Partial<Post>) => {
    try {
      setLoading(true);
      setError(null);
      const newPost = (await PostService.createPost(postData)) as Post;
      setPosts((prev) => [...prev, newPost]);
      return newPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: number, postData: Partial<Post>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedPost = (await PostService.updatePost(id, postData)) as Post;
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? updatedPost : post))
      );
      return updatedPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await PostService.deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};

// Hook para gerenciar produtos
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = (await ProductService.getAllProducts()) as Product[];
      setProducts(productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const productData = (await ProductService.getProductsByCategory(
        category
      )) as Product[];
      setProducts(productData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch products by category"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    fetchByCategory: fetchProductsByCategory,
  };
};

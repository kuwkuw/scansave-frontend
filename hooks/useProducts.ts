// This file provides a typed API client for the backend product service
import { useEffect, useState } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl?: string;
  store: string;
  category: string;
  lastUpdated: string;
  productUrl: string;
}

import Constants from 'expo-constants';

export async function fetchProducts(): Promise<Product[]> {
  const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl;
  const res = await fetch(`${baseUrl}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

/**
 * Fetch latest products from the backend, optionally filtered by limit, category, and store.
 */
export async function fetchHotDeals({ minDiscount = 10, limit = 10 }: { minDiscount?: number; limit?: number } = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (minDiscount) params.append('minDiscount', minDiscount.toString());
  if (limit) params.append('limit', limit.toString());
  const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:3000';
  const url = `${baseUrl}/products/hot-deals?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch hot deals');
  return res.json();
}

export function useHotDeals({ minDiscount = 10, limit = 10 }: { minDiscount?: number; limit?: number } = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHotDeals({ minDiscount, limit })
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDiscount, limit]);

  return { products, loading, error };
}

export async function fetchLatestProducts({ limit = 10, category, store }: { limit?: number; category?: string; store?: string } = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (category) params.append('category', category);
  if (store) params.append('store', store);
  const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:3000';
  const url = `${baseUrl}/products/latest?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch latest products');
  return res.json();
}


export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

/**
 * React hook to fetch latest products from the backend, optionally filtered by limit, category, and store.
 */
export function useLatestProducts({ limit = 10, category, store }: { limit?: number; category?: string; store?: string } = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchLatestProducts({ limit, category, store })
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, category, store]);

  return { products, loading, error };
}

export async function fetchCategories(): Promise<string[]> {
  const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}


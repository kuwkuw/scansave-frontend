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

export async function fetchSearchProducts(query: string): Promise<Product[]> {
  const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/products/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch search results');
  return res.json();
}

export function useSearchProducts(query: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    }
    setLoading(true);
    fetchSearchProducts(query)
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [query]);

  return { products, loading, error };
}

export async function fetchPaginatedOffers({ limit = 20, offset = 0, category, store }: { limit?: number; offset?: number; category?: string; store?: string } = {}): Promise<{ products: Product[]; total: number }> {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());
  if (category) params.append('category', category);
  if (store) params.append('store', store);
  const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:3000';
  const url = `${baseUrl}/products/offers?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch paginated offers');
  return res.json();
}

export function usePaginatedOffers({ limit = 20, category, store }: { limit?: number; category?: string; store?: string } = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMore = async () => {
    if (isFetchingMore || products.length >= total) return;
    setIsFetchingMore(true);
    try {
      const result = await fetchPaginatedOffers({ limit, offset: products.length, category, store });
      setProducts((prev) => [...prev, ...result.products]);
      setTotal(result.total);
      setOffset(products.length + result.products.length);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    setOffset(0);
    try {
      const result = await fetchPaginatedOffers({ limit, offset: 0, category, store });
      setProducts(result.products);
      setTotal(result.total);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setOffset(0);
    setIsInitialLoading(true);
    fetchPaginatedOffers({ limit, offset: 0, category, store })
      .then((result) => {
        setProducts(result.products);
        setTotal(result.total);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsInitialLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, category, store]);

  return { products, total, isInitialLoading, isFetchingMore, error, fetchMore, refreshing, refresh };
}

export async function fetchProductById(id: string | number): Promise<Product> {
  const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export function useProductById(id?: string | number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}


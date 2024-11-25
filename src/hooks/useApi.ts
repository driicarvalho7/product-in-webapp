import { useState } from "react";
import apiClient from "../api/apiClient";
import Cookies from "js-cookie";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiResponse<T> {
  request: <R = T>(
    url: string,
    method: HttpMethod,
    body?: any
  ) => Promise<R | null>;
  error: string | null;
}

function useApi<T = unknown>(): ApiResponse<T> {
  const [error, setError] = useState<string | null>(null);

  const request = async <R = T>(
    url: string,
    method: HttpMethod,
    body?: any
  ): Promise<R | null> => {
    setError(null);

    const token = Cookies.get("auth_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await apiClient({
        url,
        method,
        data: body,
        headers,
      });

      return response.data as R;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao realizar a requisição");
      return null;
    }
  };

  return { request, error };
}

export default useApi;

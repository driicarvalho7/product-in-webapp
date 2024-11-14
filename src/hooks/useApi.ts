import { useState } from "react";
import apiClient from "../api/apiClient";
import Cookies from "js-cookie";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiResponse<T> {
  request: (url: string, method: HttpMethod, body?: any) => Promise<T | void>;
  error: string | null;
}

function useApi<T>(): ApiResponse<T> {
  const [error, setError] = useState<string | null>(null);

  const request = async (
    url: string,
    method: HttpMethod,
    body?: any
  ): Promise<T | void> => {
    setError(null);

    const token = Cookies.get("auth_token");

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      let res;

      switch (method) {
        case "GET":
          res = await apiClient.get(url, { headers });
          break;
        case "POST":
          res = await apiClient.post(url, body, { headers });
          break;
        case "PUT":
          res = await apiClient.put(url, body, { headers });
          break;
        case "DELETE":
          res = await apiClient.delete(url, { headers });
          break;
        default:
          throw new Error("Método HTTP inválido");
      }

      return res.data;
    } catch (err: any) {
      setError(err.message || "Erro ao realizar a requisição");
    }
  };

  return { request, error };
}

export default useApi;

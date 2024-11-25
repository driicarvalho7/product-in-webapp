// src/utils/decodeJwt.ts
export interface JwtPayload {
  id: string;
  username: string;
  email: string;
  exp: number;
  iat: number;
}

export const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch (e) {
    console.error("Erro ao decodificar o JWT:", e);
    return null;
  }
};

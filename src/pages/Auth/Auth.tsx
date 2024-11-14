// src/pages/Auth.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import Cookies from "js-cookie";
import { AuthResponse } from "../../api/interfaces/Auth";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { request, error } = useApi<AuthResponse>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      const endpoint = "/signUp";
      const body = { name, email, password };

      const res = await request(endpoint, "POST", body);
      setLoading(false);

      if (res?.id) {
        alert("Usuário Registrado com Sucesso!");
        toggleAuthMode();
      }
    } else {
      const endpoint = "/signIn";
      const body = { email, password };

      const res = await request(endpoint, "POST", body);
      console.log("response: ", res);
      setLoading(false);

      if (res?.token) {
        Cookies.set("auth_token", res.token, { expires: 7 });
        navigate("/");
      }
    }
  };

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Coluna Esquerda - Background decorativo */}
      <div className="w-0 md:w-1/2 bg-gray-200 flex items-center justify-center">
        {/* Formas de fundo ou conteúdo adicional, se necessário */}
      </div>

      {/* Coluna Direita - Formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-indigo-600">
        <div className="w-[28rem] md:w-1/2 p-8 space-y-6 rounded-xl">
          <h2 className="text-4xl font-bold text-center text-white">
            ProductIn
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-white">
                  Username
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isRegister}
                  className="w-full px-4 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-semibold text-white rounded-md ${
                loading ? "bg-indigo-400" : "bg-indigo-800 hover:bg-indigo-500"
              } flex justify-center items-center`}
            >
              {loading ? (
                <svg
                  className="w-5 h-5 mr-2 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                <>{isRegister ? "Cadastrar" : "Login"}</>
              )}
            </button>
            {!isRegister && (
              <button
                type="button"
                onClick={toggleAuthMode}
                className="w-full py-2 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-600"
              >
                Cadastre-se
              </button>
            )}
            {isRegister && (
              <p
                onClick={toggleAuthMode}
                className="text-center text-white cursor-pointer hover:underline"
              >
                Já tem uma conta? Faça login
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;

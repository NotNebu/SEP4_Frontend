const BASE_URL = "https://localhost:5107/api/auth";

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const register = async (email, password, username) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getMe = async () => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

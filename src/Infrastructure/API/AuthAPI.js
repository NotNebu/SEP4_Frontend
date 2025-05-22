// src/Infrastructure/API/AuthAPI.js

const BASE_URL = "https://localhost:5107/api/auth";

export const loginAPI = (email, password) =>
  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

export const registerAPI = (email, password, username) =>
  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

export const getMeAPI = () =>
  fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

export const logoutAPI = () =>
  fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

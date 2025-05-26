const BASE_URL = "https://localhost:5107/api/auth";

// Funktion til at logge en bruger ind via API
// Tager email og kodeord som input og sender en POST-request
export const loginAPI = (email, password) =>
  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

// Funktion til at registrere en ny bruger via API
// Tager email, kodeord og brugernavn som input og sender en POST-request
export const registerAPI = (email, password, username) =>
  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

// Funktion til at hente information om den aktuelle bruger via API
// Sender en GET-request og returnerer svaret
export const getMeAPI = () =>
  fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

// Funktion til at logge brugeren ud via API
// Sender en POST-request for at logge ud
export const logoutAPI = () =>
  fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

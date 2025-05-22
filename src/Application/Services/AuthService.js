// src/Application/Services/AuthService.js

import { loginAPI, registerAPI, getMeAPI, logoutAPI } from "@/Infrastructure/API/AuthAPI";

export const loginUser = async ({ email, password }) => {
  const response = await loginAPI(email, password);

  if (!response.ok) {
    let errorMessage = "Login fejlede.";

    try {
      const data = await response.clone().json();
      if (data?.message) errorMessage = data.message;
    } catch {
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch {
        errorMessage = "Uventet fejl under login.";
      }
    }

    throw new Error(errorMessage);
  }

  return true;
};

export const registerUser = async ({ email, password, username }) => {
  const response = await registerAPI(email, password, username);

  if (!response.ok) {
    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();

      if (data.errors) {
        const messages = Object.values(data.errors).flat();
        throw new Error(messages.join("\n"));
      }

      throw new Error(data.message || "Registrering fejlede.");
    } else {
      const text = await response.text();
      throw new Error(text || "Registrering fejlede.");
    }
  }
  return true; 
};


export const getMe = async () => {
  const response = await getMeAPI();

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Kunne ikke hente brugerinfo.");
  }

  return await response.json();
};

export const logout = async () => {
  const response = await logoutAPI();

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Kunne ikke logge ud.");
  }

  return await response.json();
};
